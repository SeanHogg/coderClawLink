"""Native git auto-commit for coderClawLink.

After an agent applies file edits, this module stages the changed files and
creates a git commit — matching the auto-commit behaviour that makes Aider
so useful without relying on any external tool.

Uses only the standard-library ``subprocess`` module; no extra dependencies.
"""

from __future__ import annotations

import subprocess
from pathlib import Path
from typing import List, Optional


class GitError(Exception):
    """Raised when a git command fails."""


def _run(args: List[str], cwd: str) -> str:
    """Run a git command and return its stdout, raising GitError on failure."""
    result = subprocess.run(
        args,
        cwd=cwd,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise GitError(result.stderr.strip() or result.stdout.strip())
    return result.stdout.strip()


def is_git_repo(directory: Optional[str] = None) -> bool:
    """Return True if *directory* (or cwd) is inside a git repository."""
    cwd = str(Path(directory) if directory else Path.cwd())
    try:
        _run(["git", "rev-parse", "--git-dir"], cwd=cwd)
        return True
    except (GitError, FileNotFoundError):
        return False


def stage_files(paths: List[str], working_directory: Optional[str] = None) -> None:
    """
    Stage specific files (``git add``).

    Args:
        paths:             File paths to stage (relative to *working_directory*).
        working_directory: Repository root; defaults to cwd.
    """
    cwd = str(Path(working_directory) if working_directory else Path.cwd())
    _run(["git", "add", "--"] + paths, cwd=cwd)


def commit(
    message: str,
    working_directory: Optional[str] = None,
    author: str = "coderClawLink <agent@coderclaw.local>",
) -> str:
    """
    Create a git commit with *message*.

    Args:
        message:           Commit message.
        working_directory: Repository root; defaults to cwd.
        author:            Git author string (``Name <email>``).

    Returns:
        The new commit SHA.

    Raises:
        GitError: if the commit fails (e.g. nothing staged, not a repo).
    """
    cwd = str(Path(working_directory) if working_directory else Path.cwd())
    _run(
        ["git", "commit", "--author", author, "-m", message],
        cwd=cwd,
    )
    return _run(["git", "rev-parse", "HEAD"], cwd=cwd)


def auto_commit(
    changed_paths: List[str],
    prompt_summary: str,
    working_directory: Optional[str] = None,
) -> Optional[str]:
    """
    Stage *changed_paths* and commit them with an auto-generated message.

    This is the top-level helper that mirrors Aider's ``--auto-commits``
    behaviour.  It is a no-op (returns ``None``) when the directory is not
    a git repository or when *changed_paths* is empty.

    Args:
        changed_paths:     Relative paths of files that were modified/created.
        prompt_summary:    Short description of the task (used in commit msg).
        working_directory: Repository root; defaults to cwd.

    Returns:
        The new commit SHA, or ``None`` if no commit was made.
    """
    if not changed_paths:
        return None

    cwd = str(Path(working_directory) if working_directory else Path.cwd())

    if not is_git_repo(cwd):
        return None

    try:
        stage_files(changed_paths, cwd)
        files_str = ", ".join(changed_paths)
        message = f"coderClawLink: {prompt_summary[:72]}\n\nModified: {files_str}"
        return commit(message, cwd)
    except GitError:
        # Non-fatal: log and continue even if commit fails
        return None
