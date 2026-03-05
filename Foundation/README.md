# Foundation

This directory contains the **template files** that coderClaw uses to initialise the `.coderClaw/` knowledge-base directory when a project is set up, installed, or onboarded.

## Template Files

| File | Purpose |
|------|---------|
| [`HeartBeat.md`](./HeartBeat.md) | Agent keepalive status — last-seen timestamp, online/offline state, capabilities |
| [`Identity.md`](./Identity.md) | Agent identity — name, role, persona, skills, and runtime configuration |
| [`Memory.md`](./Memory.md) | Persistent working memory — current context, recent decisions, session handoff notes |
| [`Soul.md`](./Soul.md) | Core values and behavioural principles — ethics, escalation policy, operating guidelines |
| [`Tools.md`](./Tools.md) | Available tools — built-in tool catalogue, installed skills, custom project commands |
| [`User.md`](./User.md) | User preferences — communication style, technical preferences, project context |

## How These Files Are Used

When the coderClaw runtime initialises a new project (via `coderclaw onboard` or from the portal's project onboarding flow), these template files are copied into the project's `.coderClaw/` directory:

```
<project-root>/
└── .coderClaw/
    ├── Foundation/
    │   ├── HeartBeat.md
    │   ├── Identity.md
    │   ├── Memory.md
    │   ├── Soul.md
    │   ├── Tools.md
    │   └── User.md
    └── skills/
        └── …
```

The runtime then populates the files with agent-specific and project-specific values. The portal syncs the contents of `.coderClaw/` back to coderClawLink (see `.coderClaw Sync` in the Claw workspace panel), making the files browsable and searchable from the browser.

## Customising Templates

Edit these files to change the defaults that every new project starts with. Any changes committed here will be picked up the next time `coderclaw onboard` is run.
