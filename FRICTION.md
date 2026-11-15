# Friction log

## F-001 — 2026-11-15 — First `npx quartz build` fails to load the theme

- Observation: The first build after `npx quartz create -t obsidian` installed `@quartz-themes/default`, then failed with `Cannot find module '@quartz-themes/default'`.
- Evidence: `.scratch/build-20261115-1356.log` lines 54 and 72 in the v5 worktree. The second build passed with no change.
- Effect: One extra build cycle. A CI build from a lockfile without this package would fail.
- Cause: inferred. The theme plugin installs the package during the run, but the running process cannot load a module that it installed after start.
- Status: open. Workaround: the package is now in `package.json`.
