# The Portia trial, first run

Date: 2026-11-21. Data: [`2026-11-21-portia-init.json`](2026-11-21-portia-init.json).

Task 12 of `docs/plans/2026-11-11-starter-and-init.md`, run with Node v24.21.0 and pnpm 12.18.0.

**Outcome: failed, and Portia was deleted.** The trial ran before Tasks 7 to 10. Vulkan's `develop` held only Tasks 5 and 6, the empty shell and the locales. `themis init` copied it faithfully, so Portia had no Supabase, no AeleOS login, no owned resources, no audit log and no AI-layer files. The cause was the order of the work, not `init`. The trial is to be repeated once Tasks 7 to 10 are merged in Vulkan.

## What the runs found

| Run | Result |
|---|---|
| Dry-run before attempt 1 | five steps, all pending; did not report that Vulkan was not a template |
| Attempt 1 | exit 1, "generated but branch develop did not appear". Nothing was generated: `/generate` on a non-template answers 404, and the client returned 404 as data. Fixed in #66 |
| Attempt 2, after #66 and `is_template` set by hand | exit 0; `vaoan/Portia` created, renamed, pointers written, policy applied, registry PR #67 opened; a rerun dry-run shows all five steps done; no `vulkan` left |
| Registry PR #67 | CI red: the registry test pinned the list of bodies. Fixed in #68, then merged |
| Portia CI on push | green on `develop` (twice) and `main` |

## Steps 3 to 5, on a fresh clone with no edits

| Step | Result |
|---|---|
| `pnpm install --frozen-lockfile` | exit 0, 742 packages, 8.9s |
| `pnpm lint` | exit 0; one warning, `boundaries/no-unknown` is deprecated in favour of `boundaries/no-unknown-dependencies` |
| `pnpm typecheck` | exit 0 |
| `pnpm test` | exit 0, 2 files, 5 tests |
| `pnpm build` | exit 0 |
| Trivial PR (Portia#1) | the six required checks (`ci / branch-name`, `branch-sync`, `branch-target`, `config-drift`, `pr-title`, `test`) passed, merge state clean |
| `themis instructions` | not run: moot once the content gap was found |

## Content against the spec

| The starter must carry | In Portia | Plan task |
|---|---|---|
| Next.js, pnpm workspace, class `next-supabase-mono` | yes | 5 |
| Spanish and English | yes | 6 |
| Lint, typecheck, tests and CI from the bundle | yes | 2, 5 |
| Supabase, `current_user_id()`, the actors mirror | no | 7 |
| Owned resources with delegated capabilities, the audit log | no | 8 |
| Login through AeleOS | no | 9 |
| Root `CLAUDE.md` and `.claude/rules/` | no (39-line `CLAUDE.md` only) | 10 |

## Hand repairs (trial criterion 1)

- Vulkan's `is_template` set by hand before attempt 2. It is Task 11, Step 5, done out of order.
- The registry test rewritten (#68) so that any registry PR from `init` can pass.

## Other findings

- The starter commits `tsconfig.tsbuildinfo` at its root.
- The starter's `README.md` has no description of the body under its title.

## Kept from the trial

#66 (init refuses a non-template source and fails on a refused generation), #68 (the registry test checks shape, not roster) and #70 (Vulkan is the registered starter, and init reads its template from the registry). Each is right without Portia. `portia` is removed from `registry.json` and from the constellation table in `CLAUDE.md`.
