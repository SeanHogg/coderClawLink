"""Native file editing engine for coderClawLink.

This module gives every LLM agent the ability to read files, propose targeted
edits using a SEARCH/REPLACE block format, and write those changes back to
disk — competing with Aider's core file-editing capability without wrapping
any external tool.

Edit format
-----------
The LLM is instructed to express changes as one or more edit blocks:

    <<<<<<< SEARCH path/to/file.py
    exact lines to find (verbatim)
    =======
    replacement lines
    >>>>>>> REPLACE

Rules:
- The path appears on the SEARCH header line.
- SEARCH content must match the file verbatim (leading/trailing whitespace
  is stripped per line to be lenient about indentation drift).
- Multiple blocks in one response are applied in order.
- If SEARCH is empty the entire file is replaced with REPLACE.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Tuple


# ---------------------------------------------------------------------------
# Data types
# ---------------------------------------------------------------------------

@dataclass
class EditBlock:
    """A single SEARCH/REPLACE edit targeting one file."""
    path: str
    search: str
    replace: str


@dataclass
class EditResult:
    """Outcome of applying a set of edit blocks."""
    applied: List[str] = field(default_factory=list)   # paths successfully edited
    skipped: List[Tuple[str, str]] = field(default_factory=list)  # (path, reason)
    created: List[str] = field(default_factory=list)   # new files written


# ---------------------------------------------------------------------------
# Prompt helpers
# ---------------------------------------------------------------------------

_SYSTEM_EDIT_INSTRUCTIONS = """\
When you need to modify a file, express every change as one or more edit \
blocks using this exact format:

<<<<<<< SEARCH path/to/file.py
<exact lines to find in the file>
=======
<replacement lines>
>>>>>>> REPLACE

Rules:
- The file path appears on the same line as <<<<<<< SEARCH.
- The SEARCH section must be an exact (verbatim) copy of the lines to replace.
- To create a new file or overwrite an entire file, leave the SEARCH section \
empty.
- You may include as many edit blocks as needed in one response.
- Do not add any other markers, fences, or commentary inside the blocks.
"""


def build_file_context_prompt(
    file_contents: Dict[str, str],
    user_prompt: str,
    repo_map: Optional[str] = None,
) -> str:
    """
    Construct an enriched prompt that injects file contents and edit
    instructions before the user's request.

    Args:
        file_contents: Mapping of {relative_path: file_text}.
        user_prompt:   The original user instruction.
        repo_map:      Optional repo-map string to prepend for orientation.

    Returns:
        A single string ready to pass to any LLM agent.
    """
    parts: List[str] = []

    if repo_map:
        parts.append("## Repository map\n\n" + repo_map)

    if file_contents:
        parts.append("## Files in context\n")
        for path, content in file_contents.items():
            parts.append(f"### {path}\n```\n{content}\n```")

    parts.append(_SYSTEM_EDIT_INSTRUCTIONS)
    parts.append("## Task\n\n" + user_prompt)

    return "\n\n".join(parts)


# ---------------------------------------------------------------------------
# File I/O
# ---------------------------------------------------------------------------

def read_files(
    paths: List[str],
    working_directory: Optional[str] = None,
) -> Dict[str, str]:
    """
    Read the contents of *paths*, resolving them against *working_directory*.

    Files that cannot be read are silently skipped (with a warning comment
    inserted so the LLM is aware).

    Returns:
        {relative_path: file_text}
    """
    base = Path(working_directory) if working_directory else Path.cwd()
    result: Dict[str, str] = {}

    for raw_path in paths:
        p = Path(raw_path)
        if not p.is_absolute():
            p = base / p
        try:
            result[raw_path] = p.read_text(encoding="utf-8", errors="replace")
        except OSError as exc:
            result[raw_path] = f"# [coderClawLink: could not read file — {exc}]"

    return result


# ---------------------------------------------------------------------------
# Edit block parser
# ---------------------------------------------------------------------------

_BLOCK_RE = re.compile(
    r"<{7}\s*SEARCH\s+(?P<path>\S+)\s*\n"   # <<<<<<< SEARCH path
    r"(?P<search>.*?)"                         # search content (may be empty)
    r"={7}\s*\n"                               # =======
    r"(?P<replace>.*?)"                        # replace content
    r">{7}\s*REPLACE",                         # >>>>>>> REPLACE
    re.DOTALL,
)


def parse_edit_blocks(llm_response: str) -> List[EditBlock]:
    """
    Extract all SEARCH/REPLACE edit blocks from an LLM response.

    Returns a (possibly empty) list of :class:`EditBlock` objects in the
    order they appear in the response.
    """
    blocks: List[EditBlock] = []
    for m in _BLOCK_RE.finditer(llm_response):
        blocks.append(EditBlock(
            path=m.group("path").strip(),
            search=m.group("search"),
            replace=m.group("replace"),
        ))
    return blocks


# ---------------------------------------------------------------------------
# Edit applicator
# ---------------------------------------------------------------------------

def _normalise(text: str) -> str:
    """Strip trailing whitespace from every line for lenient matching."""
    return "\n".join(line.rstrip() for line in text.splitlines())


def apply_edits(
    blocks: List[EditBlock],
    working_directory: Optional[str] = None,
) -> EditResult:
    """
    Apply a list of edit blocks to files on disk.

    Each block's path is resolved against *working_directory* (or cwd).
    Parent directories are created automatically for new files.

    Returns:
        :class:`EditResult` summarising which files were changed/created/skipped.
    """
    base = Path(working_directory) if working_directory else Path.cwd()
    result = EditResult()

    for block in blocks:
        target = Path(block.path)
        if not target.is_absolute():
            target = base / target

        # New file (empty SEARCH section)
        if not block.search.strip():
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(block.replace, encoding="utf-8")
            result.created.append(block.path)
            continue

        # Existing file — read, find, replace
        if not target.exists():
            result.skipped.append((block.path, "file not found"))
            continue

        original = target.read_text(encoding="utf-8", errors="replace")
        norm_original = _normalise(original)
        norm_search = _normalise(block.search)

        if norm_search not in norm_original:
            result.skipped.append((block.path, "SEARCH text not found in file"))
            continue

        # Replace first occurrence only (same as Aider's default)
        new_content = norm_original.replace(norm_search, _normalise(block.replace), 1)
        # Re-attach the original line endings style
        if "\r\n" in original:
            new_content = new_content.replace("\n", "\r\n")
        target.write_text(new_content, encoding="utf-8")
        result.applied.append(block.path)

    return result
