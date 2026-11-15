---
name: quartz
description: Use when you build, preview, configure, or upgrade this Quartz 5 site, or when you add, remove, or configure a Quartz plugin. Gives the CLI commands, the config file layout, and the upgrade procedure.
---

# Quartz 5

Quartz 5 is a Node static-site generator.
It changes the Markdown notes in `content/` into a website in `public/`.
The full documentation is in `docs/` in this repository.
The live documentation is at https://quartz.jzhao.xyz.

## Requirements

- Node 22 or newer. CI uses Node 24.
- The git remotes `origin` (this site) and `upstream` (`https://github.com/jackyzha0/quartz.git`).
- The branch `v5`. The upgrade command merges `upstream/v5` into it.

## Install

1. Run `npm ci`.
2. Run `npx quartz plugin install`.

All plugins in this site are npm packages, so `npm ci` installs them at the versions in `package-lock.json`.
The second command installs Git and local plugins at the commits in `quartz.lock.json`.
This site has no such plugins now, so the file does not exist and the command has nothing to do.

## Build and preview

- Build the site: `npx quartz build`.
- Preview with hot reload at http://localhost:8080: `npx quartz build --serve`.
- Show more detail: add `--verbose`.

Redirect the build output to a log file:

```bash
npx quartz build &> .scratch/build-$(date +%Y%m%d-%H%M).log
```

A successful build ends with `Done processing <n> files`.
The message `links ... point to pages that are not on the site` is expected for notes that are not written yet.

## Configuration

All configuration is in `quartz.config.yaml`.
The file has three parts:

- `configuration`: the site settings, for example `pageTitle`, `baseUrl`, `ignorePatterns`, and `theme`.
- `plugins`: one entry for each plugin, with `source`, `enabled`, `options`, `order`, and `layout`.
- `layout`: the component groups and the changes for each page type (`byPageType`).

The file has a JSON schema: `quartz/plugins/quartz-plugins.schema.json`.
The build shows a warning for an unknown option, and it suggests the correct name.

To change where a component shows, edit `layout.position` and `layout.priority` of its plugin entry.
To change styles, write SCSS in `quartz/styles/custom.scss`.
Do not edit files in `.quartz/plugins/`. The plugin install replaces them.

## Plugins

| Task | Command |
| --- | --- |
| List the installed plugins | `npx quartz plugin list` |
| Add a plugin | `npx quartz plugin add <source>` |
| Remove a plugin | `npx quartz plugin remove <name>` |
| Turn a plugin on or off | `npx quartz plugin enable <name>`, `npx quartz plugin disable <name>` |
| Show or set plugin options | `npx quartz plugin config <name>` |
| Find config, lockfile, and install problems | `npx quartz plugin doctor` |
| Remove plugins that the config does not use | `npx quartz plugin prune --dry-run`, then `npx quartz plugin prune` |

After a plugin change, commit `quartz.config.yaml`, `package.json`, and `package-lock.json` together.
If the change creates `quartz.lock.json`, commit that file too.

## Upgrade

1. Make sure that the working tree is clean.
2. Run `npx quartz upgrade`.
3. Read the release notes that the command shows.
4. If the command reports plugin entries that are now built in, run `npx quartz plugin doctor --fix`.
5. Build the site and read the log.
6. Commit the result on a branch.

The upgrade merges `upstream/v5`, runs `npm install`, and installs the plugins again.
Resolve a conflict by hand. A conflict in `package.json` is possible, because this site added plugin dependencies to it.
If the upgrade breaks the content folder, run `npx quartz restore`.

## Commands to avoid

CAUTION: `npx quartz sync` commits and pushes to GitHub. Do not run it. Use git directly.

CAUTION: `npx quartz create` writes a new `quartz.config.yaml`. Do not run it in this repository.

## Known problems

- The first build after a new theme install can fail with `Cannot find module '@quartz-themes/...'`. Run the build again. See `FRICTION.md`, entry F-001.
- Builds with the `CI` environment variable fail on plugins that do not load. Run `npx quartz plugin doctor` to find the cause.
