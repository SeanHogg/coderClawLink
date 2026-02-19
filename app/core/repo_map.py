"""Native repository mapper for coderClawLink.

Generates a compact, LLM-friendly map of a repository's structure so that
agents can understand the codebase without having every file injected into
the context window — directly competing with Aider's repo-map feature.

For Python files the map includes top-level classes and functions extracted
via the standard-library ``ast`` module (no extra dependencies).  For all
other files only the directory tree is shown.
"""

from __future__ import annotations

import ast
import os
from pathlib import Path
from typing import List, Optional

# File extensions we try to parse for symbols
_PYTHON_EXTS = {".py"}

# Directories always excluded
_SKIP_DIRS = {
    ".git", "__pycache__", ".mypy_cache", ".pytest_cache",
    "node_modules", ".venv", "venv", "env", ".env",
    "dist", "build", ".tox",
}

# Files always excluded
_SKIP_FILES = {".DS_Store", "Thumbs.db"}


def _extract_python_symbols(path: Path) -> List[str]:
    """Return top-level class and function names from a Python file."""
    try:
        tree = ast.parse(path.read_text(encoding="utf-8", errors="replace"))
    except SyntaxError:
        return []

    symbols: List[str] = []
    for node in ast.iter_child_nodes(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            symbols.append(f"def {node.name}()")
        elif isinstance(node, ast.ClassDef):
            methods = [
                f"  def {n.name}()"
                for n in ast.iter_child_nodes(node)
                if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef))
            ]
            if methods:
                symbols.append(f"class {node.name}:\n" + "\n".join(methods))
            else:
                symbols.append(f"class {node.name}")
    return symbols


def generate_repo_map(
    directory: Optional[str] = None,
    max_depth: int = 4,
    include_symbols: bool = True,
) -> str:
    """
    Walk *directory* and return a compact map string suitable for inclusion
    in an LLM prompt.

    Args:
        directory:       Root directory to map (defaults to cwd).
        max_depth:       Maximum directory depth to traverse.
        include_symbols: When True, Python files include their top-level
                         class/function names.

    Returns:
        A multi-line string describing the repo structure.
    """
    root = Path(directory) if directory else Path.cwd()
    lines: List[str] = [f"Repository: {root.name}/"]

    def _walk(current: Path, depth: int, prefix: str) -> None:
        if depth > max_depth:
            return

        try:
            entries = sorted(current.iterdir(), key=lambda p: (p.is_file(), p.name))
        except PermissionError:
            return

        dirs = [e for e in entries if e.is_dir() and e.name not in _SKIP_DIRS]
        files = [e for e in entries if e.is_file() and e.name not in _SKIP_FILES]

        for i, d in enumerate(dirs):
            connector = "└── " if (i == len(dirs) - 1 and not files) else "├── "
            lines.append(f"{prefix}{connector}{d.name}/")
            extension = "    " if connector.startswith("└") else "│   "
            _walk(d, depth + 1, prefix + extension)

        for i, f in enumerate(files):
            connector = "└── " if i == len(files) - 1 else "├── "
            lines.append(f"{prefix}{connector}{f.name}")

            if include_symbols and f.suffix in _PYTHON_EXTS:
                symbols = _extract_python_symbols(f)
                sym_prefix = prefix + ("    " if connector.startswith("└") else "│   ")
                for sym in symbols:
                    for sym_line in sym.splitlines():
                        lines.append(f"{sym_prefix}  {sym_line}")

    _walk(root, 1, "")
    return "\n".join(lines)
