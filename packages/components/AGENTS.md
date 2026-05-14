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

Each component doc inlines runnable example source and links to the underlying React Aria primitive — consult those upstream docs for behavioral details (keyboard handling, ARIA semantics, advanced state) not covered by OUI's own docs.

## Types

Prop types ship as `.d.ts` files in `dist/types/`. TypeScript-aware tooling resolves them automatically.
