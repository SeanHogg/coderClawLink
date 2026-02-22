"""Tests for the native file-editing, repo-map, and git-commit modules."""

import os
import subprocess
import textwrap
from pathlib import Path

import pytest

from app.core.file_editor import (
    EditBlock,
    apply_edits,
    build_file_context_prompt,
    parse_edit_blocks,
    read_files,
)
from app.core.git_commit import GitError, auto_commit, is_git_repo
from app.core.repo_map import generate_repo_map


# ===========================================================================
# file_editor — read_files
# ===========================================================================

def test_read_files_existing(tmp_path):
    f = tmp_path / "hello.py"
    f.write_text("print('hello')")
    result = read_files(["hello.py"], working_directory=str(tmp_path))
    assert result["hello.py"] == "print('hello')"


def test_read_files_missing(tmp_path):
    result = read_files(["missing.py"], working_directory=str(tmp_path))
    assert "could not read" in result["missing.py"].lower()


def test_read_files_absolute_path(tmp_path):
    f = tmp_path / "abs.py"
    f.write_text("x = 1")
    result = read_files([str(f)])
    assert result[str(f)] == "x = 1"


# ===========================================================================
# file_editor — build_file_context_prompt
# ===========================================================================

def test_build_prompt_contains_file_content():
    prompt = build_file_context_prompt(
        {"app.py": "def main(): pass"},
        "Refactor main()",
    )
    assert "def main(): pass" in prompt
    assert "Refactor main()" in prompt
    assert "SEARCH" in prompt  # edit instructions present


def test_build_prompt_includes_repo_map():
    prompt = build_file_context_prompt(
        {},
        "Do something",
        repo_map="src/\n  main.py",
    )
    assert "Repository map" in prompt
    assert "main.py" in prompt


# ===========================================================================
# file_editor — parse_edit_blocks
# ===========================================================================

def test_parse_single_block():
    response = textwrap.dedent("""\
        Sure, here is the fix:

        <<<<<<< SEARCH app/main.py
        def old():
            pass
        =======
        def new():
            return 42
        >>>>>>> REPLACE
    """)
    blocks = parse_edit_blocks(response)
    assert len(blocks) == 1
    assert blocks[0].path == "app/main.py"
    assert "def old():" in blocks[0].search
    assert "def new():" in blocks[0].replace


def test_parse_multiple_blocks():
    response = textwrap.dedent("""\
        <<<<<<< SEARCH a.py
        foo
        =======
        bar
        >>>>>>> REPLACE

        <<<<<<< SEARCH b.py
        baz
        =======
        qux
        >>>>>>> REPLACE
    """)
    blocks = parse_edit_blocks(response)
    assert len(blocks) == 2
    assert blocks[0].path == "a.py"
    assert blocks[1].path == "b.py"


def test_parse_empty_search_means_new_file():
    response = textwrap.dedent("""\
        <<<<<<< SEARCH new_file.py
        =======
        # brand new content
        >>>>>>> REPLACE
    """)
    blocks = parse_edit_blocks(response)
    assert len(blocks) == 1
    assert blocks[0].search.strip() == ""
    assert "brand new content" in blocks[0].replace


def test_parse_no_blocks():
    assert parse_edit_blocks("Just a plain response with no edits.") == []


# ===========================================================================
# file_editor — apply_edits
# ===========================================================================

def test_apply_edit_modifies_file(tmp_path):
    f = tmp_path / "code.py"
    f.write_text("def old():\n    pass\n")
    blocks = [EditBlock(
        path="code.py",
        search="def old():\n    pass\n",
        replace="def new():\n    return 42\n",
    )]
    result = apply_edits(blocks, working_directory=str(tmp_path))
    assert "code.py" in result.applied
    assert "def new():" in f.read_text()


def test_apply_edit_creates_new_file(tmp_path):
    blocks = [EditBlock(path="brand_new.py", search="", replace="x = 1\n")]
    result = apply_edits(blocks, working_directory=str(tmp_path))
    assert "brand_new.py" in result.created
    assert (tmp_path / "brand_new.py").read_text() == "x = 1\n"


def test_apply_edit_skips_missing_file(tmp_path):
    blocks = [EditBlock(path="ghost.py", search="old", replace="new")]
    result = apply_edits(blocks, working_directory=str(tmp_path))
    assert any("ghost.py" in s[0] for s in result.skipped)


def test_apply_edit_skips_when_search_not_found(tmp_path):
    f = tmp_path / "code.py"
    f.write_text("def real(): pass\n")
    blocks = [EditBlock(path="code.py", search="def fake(): pass", replace="")]
    result = apply_edits(blocks, working_directory=str(tmp_path))
    assert any("code.py" in s[0] for s in result.skipped)
    assert f.read_text() == "def real(): pass\n"  # unchanged


def test_apply_edit_creates_parent_dirs(tmp_path):
    blocks = [EditBlock(path="sub/dir/new.py", search="", replace="pass\n")]
    apply_edits(blocks, working_directory=str(tmp_path))
    assert (tmp_path / "sub" / "dir" / "new.py").exists()


# ===========================================================================
# repo_map — generate_repo_map
# ===========================================================================

def test_repo_map_lists_files(tmp_path):
    (tmp_path / "main.py").write_text("def run(): pass\n")
    (tmp_path / "utils.py").write_text("def helper(): pass\n")
    result = generate_repo_map(str(tmp_path))
    assert "main.py" in result
    assert "utils.py" in result


def test_repo_map_extracts_symbols(tmp_path):
    (tmp_path / "mod.py").write_text(
        "class Foo:\n    def bar(self): pass\n\ndef top(): pass\n"
    )
    result = generate_repo_map(str(tmp_path), include_symbols=True)
    assert "class Foo" in result
    assert "def bar()" in result
    assert "def top()" in result


def test_repo_map_excludes_hidden_dirs(tmp_path):
    (tmp_path / ".git").mkdir()
    (tmp_path / ".git" / "config").write_text("")
    (tmp_path / "app.py").write_text("")
    result = generate_repo_map(str(tmp_path))
    assert ".git" not in result
    assert "app.py" in result


def test_repo_map_respects_max_depth(tmp_path):
    deep = tmp_path / "a" / "b" / "c" / "d"
    deep.mkdir(parents=True)
    (deep / "deep.py").write_text("")
    result = generate_repo_map(str(tmp_path), max_depth=2)
    assert "deep.py" not in result


# ===========================================================================
# git_commit — is_git_repo
# ===========================================================================

def test_is_git_repo_false_for_plain_dir(tmp_path):
    assert not is_git_repo(str(tmp_path))


def test_is_git_repo_true_for_git_dir(tmp_path):
    subprocess.run(["git", "init", str(tmp_path)], check=True, capture_output=True)
    assert is_git_repo(str(tmp_path))


# ===========================================================================
# git_commit — auto_commit
# ===========================================================================

def _init_repo(tmp_path: Path) -> None:
    subprocess.run(["git", "init", str(tmp_path)], check=True, capture_output=True)
    subprocess.run(
        ["git", "config", "user.email", "test@test.com"],
        cwd=str(tmp_path), check=True, capture_output=True,
    )
    subprocess.run(
        ["git", "config", "user.name", "Test"],
        cwd=str(tmp_path), check=True, capture_output=True,
    )


def test_auto_commit_no_op_outside_repo(tmp_path):
    f = tmp_path / "file.py"
    f.write_text("x = 1")
    sha = auto_commit(["file.py"], "test task", working_directory=str(tmp_path))
    assert sha is None


def test_auto_commit_creates_commit(tmp_path):
    _init_repo(tmp_path)
    f = tmp_path / "file.py"
    f.write_text("x = 1")
    sha = auto_commit(["file.py"], "add file", working_directory=str(tmp_path))
    assert sha is not None
    log = subprocess.run(
        ["git", "log", "--oneline"],
        cwd=str(tmp_path), capture_output=True, text=True,
    ).stdout
    assert "coderClawLink" in log


def test_auto_commit_no_op_empty_paths(tmp_path):
    _init_repo(tmp_path)
    sha = auto_commit([], "nothing", working_directory=str(tmp_path))
    assert sha is None


# ===========================================================================
# Integration: parse → apply → commit round-trip
# ===========================================================================

def test_end_to_end_edit_and_commit(tmp_path):
    _init_repo(tmp_path)
    f = tmp_path / "app.py"
    f.write_text("def greet():\n    return 'hello'\n")

    llm_response = textwrap.dedent("""\
        I'll update the greeting:

        <<<<<<< SEARCH app.py
        def greet():
            return 'hello'
        =======
        def greet():
            return 'hello, world'
        >>>>>>> REPLACE
    """)

    blocks = parse_edit_blocks(llm_response)
    edit_result = apply_edits(blocks, working_directory=str(tmp_path))
    sha = auto_commit(
        edit_result.applied, "update greet", working_directory=str(tmp_path)
    )

    assert "app.py" in edit_result.applied
    assert "hello, world" in f.read_text()
    assert sha is not None
