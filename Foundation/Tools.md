# Tools

> This file documents the tools available to this coderClaw agent.
> It is placed in the `.coderClaw/` directory during project setup/init.
> Update this file when new skills are installed or tools are configured.

## Built-In Tools

| Tool | Description |
|------|-------------|
| `read_file` | Read the contents of a file at a given path |
| `write_file` | Write or overwrite a file at a given path |
| `list_directory` | List files and subdirectories at a given path |
| `run_command` | Execute a shell command and return stdout/stderr |
| `search_code` | Semantic search across the project codebase |
| `git_status` | Show working tree status |
| `git_diff` | Show changes between commits or the working tree |
| `git_commit` | Stage and commit changes with a message |

## Installed Skills

<!-- List skills installed from the marketplace or custom sources.
     Each entry should include the skill slug, version, and a one-line description.

Example:
- `code-review@1.2.0` — Automated PR review with style and correctness checks
- `test-generation@2.0.1` — Generate unit and integration tests from source files
-->

## Custom Tools

<!-- Document any project-specific tools or scripts available to this agent.

Example:
| Tool | Command | Description |
|------|---------|-------------|
| `db:migrate` | `pnpm db:migrate` | Run pending database migrations |
| `dev:api` | `pnpm dev:api` | Start the API worker in development mode |
-->

## Tool Policies

- Always prefer read-only tools (`read_file`, `list_directory`, `search_code`) before modifying state.
- Use `run_command` only for commands defined in `package.json` scripts or documented above.
- Do not use `run_command` to install packages without user confirmation.
