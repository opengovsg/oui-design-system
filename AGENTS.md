# AGENTS.md

`oui-design-system` is a frontend-only pnpm + Turborepo monorepo (OGP's "OUI" React design system). There are no backends, databases, or external services. See `README.md` for the component/authoring workflow and `packages/components/AGENTS.md` for library usage.

Workspaces: `packages/*` (publishable: `@opengovsg/oui`, `@opengovsg/oui-theme`, `@opengovsg/oui-token-gen`), `apps/*` (`@oui/storybook`, `@oui/www`, `@oui/fixture-consumer`), and `tooling/*`.

## Cursor Cloud specific instructions

- Node/pnpm: the repo requires Node `>=24.13.0` (`.nvmrc` pins `24.13.0`) and `pnpm@10.17.0`. The VM's default `/exec-daemon/node` is Node 22 and takes PATH precedence, so interactive login shells are configured (via `~/.bashrc`) to prioritize the nvm-managed Node 24, with pnpm provided through Corepack. In a fresh login shell `node -v` should report `v24.13.0` and `pnpm -v` `10.17.0` — if you get Node 22 / "pnpm: command not found", run `bash -l` or `source ~/.bashrc` first.
- Standard commands live in the root `package.json` (`pnpm lint`, `pnpm test`, `pnpm build`, `pnpm dev`) and are orchestrated by Turborepo. pnpm is enforced (`preinstall: only-allow pnpm`).
- Dev servers: `apps/storybook` serves the component playground on port 6006 (`cd apps/storybook && pnpm dev`); `apps/www` is the Next.js docs site on port 3000 (`cd apps/www && pnpm dev`). Root `pnpm dev` starts every app's dev task in parallel — note both `@oui/www` and `@oui/fixture-consumer` run `next dev` on port 3000, so the second one auto-shifts to 3001. Prefer running a single app's dev task when you only need one.
- Tests (`pnpm test`) run Vitest in browser mode via Playwright/Chromium (the `@oui/storybook` project renders stories in a headless browser; `@oui/www` tests the generated shadcn registry). The Chromium browser is preinstalled in the VM snapshot. If the suite ever reports a missing browser (e.g. after a Playwright version bump), reinstall it with `pnpm exec playwright install chromium` from `apps/storybook`.
- On `pnpm install`, pnpm reports "Ignored build scripts" for `esbuild`, `sharp`, `@swc/core`, `msw`, `core-js-pure`. This is expected — lint, tests, and full builds (`pnpm build`) all pass with these ignored, so there is no need to run `pnpm approve-builds`.
