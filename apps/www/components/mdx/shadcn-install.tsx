import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"

import { siteConfig } from "@/config/site"

interface ShadcnInstallProps {
  /**
   * The kebab-case registry item name. The rendered command pulls
   * `${siteConfig.registryBaseUrl}/<name>.json`.
   */
  name: string
}

// Package-manager runner mapping for `npx ...` commands
// (npx → pnpm dlx → bunx --bun; yarn keeps npx).
const RUNNERS: { name: string; run: (cmd: string) => string }[] = [
  { name: "npm", run: (cmd) => `npx ${cmd}` },
  { name: "pnpm", run: (cmd) => `pnpm dlx ${cmd}` },
  { name: "yarn", run: (cmd) => `npx ${cmd}` },
  { name: "bun", run: (cmd) => `bunx --bun ${cmd}` },
]

/**
 * Renders the shadcn-CLI install command for a single registry item as the
 * same tabbed UI Fumadocs produces for `package-install` code blocks.
 *
 * Usage in MDX: `<ShadcnInstall name="combo-box" />`
 */
export function ShadcnInstall({ name }: ShadcnInstallProps) {
  const command = `shadcn@latest add ${siteConfig.registryBaseUrl}/${name}.json`
  return (
    <Tabs groupId="package-manager" persist items={RUNNERS.map((r) => r.name)}>
      {RUNNERS.map((runner) => (
        <Tab key={runner.name} value={runner.name}>
          <DynamicCodeBlock lang="bash" code={runner.run(command)} />
        </Tab>
      ))}
    </Tabs>
  )
}
