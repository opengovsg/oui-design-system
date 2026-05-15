# @opengovsg/oui — Agent guide

This is the React component package of the OUI design system from Open Government Products Singapore. Components are built on [react-aria-components](https://react-aria.adobe.com/).

## Install

```bash
# pnpm
pnpm add @opengovsg/oui @opengovsg/oui-theme tailwindcss react-aria-components motion

# yarn
yarn add @opengovsg/oui @opengovsg/oui-theme tailwindcss react-aria-components motion

# npm
npm install @opengovsg/oui @opengovsg/oui-theme tailwindcss react-aria-components motion

# bun
bun add @opengovsg/oui @opengovsg/oui-theme tailwindcss react-aria-components motion
```

Then add `@import "@opengovsg/oui-theme/tailwind.css"` to your Tailwind entrypoint. Full setup: https://oui.open.gov.sg/docs/getting-started/installation

## Or install as local source via the shadcn CLI

Each component is also distributed as a shadcn-CLI-compatible registry entry, so callers who need to customize beyond what props expose can take local ownership:

```bash
npx shadcn@latest add https://oui.open.gov.sg/r/<name>.json
```

Component files land in `components/oui/`, shared utilities in `lib/oui/`. From that point on, the file is yours — we don't push updates to it. Full guide: https://oui.open.gov.sg/llm/getting-started/registry.md

## Import

```tsx
import { Button, Accordion, TextField } from "@opengovsg/oui"
```

Subpath imports also work (e.g., `import { Button } from "@opengovsg/oui/button"`).

## Agent-friendly docs

Structured markdown is available at predictable URLs:

- **Index**: https://oui.open.gov.sg/llms.txt — list of every component with one-line descriptions
- **Single-file dump**: https://oui.open.gov.sg/llms-full.txt — all docs concatenated
- **Per-component**: `https://oui.open.gov.sg/llm/components/<name>.md` — e.g. `/llm/components/button.md`
- **Setup guides**: `https://oui.open.gov.sg/llm/getting-started/<name>.md` — e.g. `/llm/getting-started/next.md`
- **Topical guides**: `https://oui.open.gov.sg/llm/guides/<name>.md`

Each component doc inlines runnable example source and links to the underlying React Aria primitive — consult those upstream docs for behavioral details (keyboard handling, ARIA semantics, advanced state) not covered by OUI's own docs.

## Cross-cutting guides

- **Forms**: https://oui.open.gov.sg/llm/guides/forms.md — composition with `<Form>`, validation patterns, React Hook Form + Zod integration, server errors, layout conventions.

## Contributing to docs

If you're editing component docs, follow the rubric: https://oui.open.gov.sg/llm/contributing/doc-quality-rubric.md

## Types

Prop types ship as `.d.ts` files in `dist/types/`. TypeScript-aware tooling resolves them automatically.
