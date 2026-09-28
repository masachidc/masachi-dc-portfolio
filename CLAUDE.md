# masachi-dc-portfolio

Personal portfolio. React 18 + Vite 6 + Tailwind CSS v4 + motion + react-router-dom. Lenis smooth scroll (instance on `window.__lenis`).

## Commands

- `npm run dev` — dev server (port 5173)
- `npm run build` — production build. **This is the only validation step**: no TypeScript compiler, linter, or tests are installed. Don't add them just to create extra checks.

## Autonomous work

- Default to action: inspect the code, implement, verify with `npm run build`, review the diff, commit. Push to `master` when asked for end-to-end execution.
- Don't ask questions the repo can answer. Follow existing conventions; match the surrounding code.
- Scope discipline: change only what's requested or clearly necessary. No unrelated refactors or speculative abstractions.
- Before pushing: check `git status`, review the diff, run the build, stage only task files (never `.claude/settings.local.json` or secrets), then a normal `git push`.
- Never claim a check passed unless it ran. If one can't run, say exactly why.
- Preserve uncommitted work you didn't create.
- On failure: read the error, diagnose, apply a non-destructive fix, continue.
- Ask first before: force-push, deleting remote branches, `git reset --hard` over user work, `--no-verify`, disabling checks to go green, rewriting published history.
