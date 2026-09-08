# Development workflow

Baseline verified September 8, 2026, from source commit `6af4d12`.

## Machine and checkout

All development and builds run on the Mac mini, including dependency installation and production builds. The MacBook Pro is a remote control device. Keep Process Supreme projects under `/Users/johnny/Projects`, each with its corresponding GitHub remote.

- Verified hardware: Mac mini, model `Mac16,11`, Apple M4 Pro, 24 GB memory.
- Canonical checkout: `/Users/johnny/Projects/pow-peptides`.
- Repository: `https://github.com/processsupreme/pow-peptides-prototype.git`.
- Existing website: `https://pow-peptides-prototype.vercel.app/` (HTTP 200 verified).
- Initial branch: `main`, tracking `origin/main`, clean working tree.
- Baseline branch: `docs/mac-mini-baseline-2026-09-08`.
- No pre-existing applicable `AGENTS.md` was found in the checkout or its ancestors during this pass.

Before editing, check `pwd`, `system_profiler SPHardwareDataType`, `git remote -v`, and `git status --short --branch`. Hardware output contains unique identifiers; do not copy those into public files. `sysctl -n hw.model` was sandbox-blocked; System Profiler supplied the hardware verification. Stop if machine, checkout, or repository differs.

## Setup and commands

`package.json` requires Node `>=22.13.0`. This baseline used Node `v24.18.0` and npm `12.0.1`. No `.nvmrc`, `.node-version`, or `packageManager` pin exists. Preserve the existing requirement; these observed versions are not a newly imposed runtime rule. `package-lock.json` uses lockfile version 3 and pins dependencies.

```bash
cd /Users/johnny/Projects/pow-peptides
npm ci
npm run dev
```

Use `npm ci` when dependencies are missing or a clean lockfile install is needed. No production credentials are required for this prototype. The verified development URL was `http://localhost:3000/`; use the URL printed by the server. Stop the server with Ctrl-C when finished.

| Command | Purpose / output |
| --- | --- |
| `npm run dev` | Vinext/Vite development with Cloudflare local runtime |
| `npm run lint` | ESLint across source, excluding build output |
| `npm run typecheck` | Generate Next.js route types, then check TypeScript without emitting build or incremental cache output; supports Vercel's required TypeCheck |
| `npm test` | Runs the Vinext build, then Node's rendered-HTML suite |
| `npm run build` | Vinext/Sites Worker build in `dist/` |
| `npm run vercel-build` | Native `next build` in `.next/`; configured Vercel production build command |
| `npm start` | Vinext production server after the Vinext build, not the Next.js server |
| `npm run db:generate` | Drizzle migration generation; not needed with the current empty schema |

Run the relevant checks locally:

```bash
npm run lint
npm test
npm run vercel-build
git diff --check
git status --short
```

The baseline had no separate typecheck script. During the subsequently authorized deployment, `npm run typecheck` was added because Vercel skipped its required TypeCheck without it. The Next.js production build also includes TypeScript validation. `tsconfig.json` covers the app and Next configuration; it excludes the Worker/database/Vite sources. The existing tests import `dist/server/index.js`, call the Worker with a stub asset binding, and assert HTML and selected source content. They do not exercise browser hydration, clicking, persistence, OAuth, payments, or real services.

## Baseline results and setup notes

- `npm ci`: passed, 480 packages installed; manifest and lockfile unchanged. npm reported 23 vulnerabilities (1 low, 5 moderate, 17 high), deprecated esbuild-kit packages, and seven blocked package install scripts under the existing npm policy. Builds still passed. No policy bypass, audit fix, or dependency upgrade was applied; advisory applicability needs a separate review.
- `npm run lint`: passed, zero errors and 10 existing `@next/next/no-img-element` warnings.
- `npm test`: passed, including the Vinext production build and all 39 tests.
- `npm run vercel-build`: passed, including compilation, TypeScript, and route generation, after local sandbox escalation.
- `npm run dev`: started and returned HTTP 200 at `/` after local sandbox escalation. This was an HTTP smoke check, not visual or browser interaction QA.
- Sandbox failures: Turbopack's CSS worker could not bind a local port; Vinext development could not listen on its inspector port. Retry the same command through the execution tool's approval mechanism outside the sandbox **on the same Mini**. Do not move execution to another machine or hosted builder.
- Next.js regenerated tracked `next-env.d.ts`, removing the Vinext augmentation import. This incidental generated edit was restored to its original content after verification. Inspect that file after switching build paths; do not commit generated churn automatically.

`dist/`, `.next/`, `.wrangler/`, `.vercel/`, dependencies, and `.env*` are ignored. Keep secrets and generated files out of commits. Wrangler/Miniflare settings in `vite.config.ts` keep tool state project-local and configure polling under the Codex Seatbelt sandbox.

## Hosting and push restriction

Current phase clarification (September 8, 2026): this is an interactive product specification. Resolving Mini-only push/delivery configuration is deferred until closer to launch and is not a prerequisite for continued local prototype work. Production authentication, payments, recurring billing, and affiliate integrations are also deferred. Continue demonstrating these experiences with synthetic data; keep future integration requirements documented. This deferral does not itself authorize a push, remote build, or deployment.

Subsequent authorization (September 8, 2026): the user explicitly requested “push and deploy everything.” The completed feature branch was pushed to the existing GitHub repository and triggered a Vercel preview build. Remote Vercel builds and production promotion for this release are authorized; the earlier baseline hold is historical. Keep the existing site identity and required checks. This release does not require merging into `main`.

`vercel.json` preserves framework `nextjs` and `npm run vercel-build`. `.openai/hosting.json` preserves the existing Sites project ID with D1 and R2 disabled. The Worker/Vinext build path also remains intact. Do not initialize a replacement hosting project or change domains.

Read-only GitHub inspection found no Actions workflows, repository webhooks, check runs or commit statuses for remote `main`, or deployments in the queried recent deployment list. That does **not** establish that GitHub App integrations or Vercel automatic deployments are disabled. No local Vercel CLI/project linkage was available for verifying the project-side Git settings. Vercel documents automatic preview deployments on branch pushes: [Git deployment documentation](https://vercel.com/docs/git), checked September 8, 2026.

The baseline commit is retained locally. Before pushing, verify the existing Vercel project's Git connection and all external build triggers, and establish a workflow that builds only on the Mini while preserving the existing hosting identity. Do not use a test push to discover the behavior. A passing `npm run vercel-build` verifies the configured application build; it does not create or validate a Vercel Build Output API artifact or authorize deployment. No merge or deployment was performed.

## Git procedure

1. Verify the environment and inspect all existing changes. Do not reset, clean, or stash someone else's work without direction.
2. Create a fresh branch with `git switch -c <unique-feature-name>`. If the name exists, choose another; never use `-C` to overwrite it. The Codex sandbox makes `.git` read-only, so branch creation/staging/commit may require the execution tool's local escalation.
3. Make scoped changes and run relevant local checks. Document existing product defects separately from setup fixes.
4. Review `git diff`, stage only explicit task files, then inspect `git diff --cached` and `git diff --cached --check`. Exclude secrets, customer information, internal costs, and generated changes.
5. Commit locally and record `git rev-parse HEAD`. Push only after the Mini-only build condition above is positively verified. Do not merge into `main` or deploy without a separate instruction.
