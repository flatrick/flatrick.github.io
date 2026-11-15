# Friction log

## F-001 — 2026-11-15 — First `npx quartz build` fails to load the theme

- Observation: The first build after `npx quartz create -t obsidian` installed `@quartz-themes/default`, then failed with `Cannot find module '@quartz-themes/default'`.
- Evidence: `.scratch/build-20261115-1356.log` lines 54 and 72 in the v5 worktree. The second build passed with no change.
- Effect: One extra build cycle. A CI build from a lockfile without this package would fail.
- Cause: inferred. The theme plugin installs the package during the run, but the running process cannot load a module that it installed after start.
- Status: open. Workaround: the package is now in `package.json`.

## F-002 — 2026-11-15 — The `github-pages` environment blocked the first v5 deploy

- Observation: The first deploy job failed with `Branch "v5" is not allowed to deploy to github-pages due to environment protection rules.`
- Evidence: Run 43716530677. The environment branch policy listed only `hugo`.
- Effect: One failed deploy. The fix was a new branch policy for `v5` through `gh api`.
- Cause: verified. The environment had `custom_branch_policies: true` with `hugo` as the only allowed branch.
- Status: resolved.
