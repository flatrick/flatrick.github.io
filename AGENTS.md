# AGENTS.md

This repository is the source of https://flatrick.github.io, a personal digital garden.
It is a copy of Quartz 5 with the owner's notes and configuration.
For Quartz commands, use the skill in `.agents/skills/quartz/SKILL.md`.

## Layout

| Path | Owner | Contents |
| --- | --- | --- |
| `content/` | site | The published notes. `content/index.md` is the homepage. |
| `content/notes/images/` | site | Images that the notes use. |
| `content/templates/`, `content/.obsidian/` | site | Obsidian files. The build ignores them. |
| `quartz.config.yaml` | site | The site configuration and the plugin list. |
| `package.json`, `package-lock.json` | site and upstream | The npm plugin versions. All plugins in this site are npm packages. |
| `.github/workflows/deploy.yml` | site | The GitHub Pages deploy. |
| `FRICTION.md` | site | The friction log. |
| `quartz/`, `docs/`, `quartz.ts` | upstream | The Quartz code and documentation. |
| `.quartz/`, `public/`, `node_modules/` | generated | Do not edit or commit. |

## Rules

- Do not edit files that upstream owns. An edit causes merge conflicts in `npx quartz upgrade`.
- Put style changes in `quartz/styles/custom.scss` only.
- Put site changes in `content/` and `quartz.config.yaml`.
- Write notes in Obsidian-flavored Markdown. Wikilinks and callouts work.
- Do not add redirects for old Quartz 3 URLs. The owner decided this.

## Branches and deploy

- `v5` is the default branch. A push to `v5` deploys the site to GitHub Pages.
- Do your work on a separate branch. The owner merges it with a GitHub pull request.
- Do not push to `v5` without permission from the owner.
- The tag `quartz3-hugo` holds the last Quartz 3 (Hugo) version of the site.

## Verify a change

1. Run `npm ci` and `npx quartz plugin install`.
2. Run `npx quartz build &> .scratch/build-$(date +%Y%m%d-%H%M).log`.
3. Read the last 20 lines of the log.
4. Make sure that the number of parsed Markdown files agrees with the number of notes.
5. For a visual change, run `npx quartz build --serve` and open http://localhost:8080.

`.scratch/` is gitignored. Keep all logs there.

## Friction log

Record friction in `FRICTION.md`.
Give each entry an ID, a date, the observation, the evidence, the effect, the cause, and a status.
Mark a cause as "verified" or "inferred".
