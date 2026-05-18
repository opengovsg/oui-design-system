import { docsConfig } from "@/config/docs.config"

import { CodeBlockCommand } from "./code-block-command"

interface ShadcnInstallProps {
  /**
   * The kebab-case registry item name. The rendered command pulls
   * `${docsConfig.registryBaseUrl}/<name>.json` so changing the base URL
   * is a one-line edit in `config/docs.config.ts`.
   */
  name: string
}

/**
 * Renders the shadcn-CLI install command for a single registry item, as the
 * same tabbed UI the `rehype-npm-command` plugin produces for an `npx ...`
 * code block in MDX. The variants here mirror the plugin's "npx" branch
 * (npx → pnpm dlx → bunx --bun; yarn keeps `npx`).
 *
 * Usage in MDX: `<ShadcnInstall name="combo-box" />`
 */
export function ShadcnInstall({ name }: ShadcnInstallProps) {
  const npxCommand = `npx shadcn@latest add ${docsConfig.registryBaseUrl}/${name}.json`
  return (
    <CodeBlockCommand
      __npmCommand__={npxCommand}
      __yarnCommand__={npxCommand}
      __pnpmCommand__={npxCommand.replace("npx", "pnpm dlx")}
      __bunCommand__={npxCommand.replace("npx", "bunx --bun")}
    />
  )
}
