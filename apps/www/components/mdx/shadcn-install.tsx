import { docsConfig } from "@/config/docs.config"

import { highlightCode } from "@/lib/shiki"
import { cn } from "@opengovsg/oui-theme"

import { CopyButton } from "./copy-button"

interface ShadcnInstallProps {
  /**
   * The kebab-case registry item name. The rendered command pulls
   * `${docsConfig.registryBaseUrl}/<name>.json` so changing the base URL
   * is a one-line edit in `config/docs.config.ts`.
   */
  name: string
}

/**
 * Renders the shadcn-CLI install command for a single registry item.
 *
 * Usage in MDX: `<ShadcnInstall name="combo-box" />`
 *
 * Mirrors the rendering shape of `<CodeBlockCommand>` for a single command —
 * the Shiki-produced HTML is server-rendered trusted output (no user input).
 */
export async function ShadcnInstall({ name }: ShadcnInstallProps) {
  const command = `npx shadcn@latest add ${docsConfig.registryBaseUrl}/${name}.json`
  const html = await highlightCode(command, { lang: "bash" })

  return (
    <div className="relative my-6 font-mono text-sm font-normal">
      <div className="absolute top-3 right-3 z-10">
        <CopyButton>{command}</CopyButton>
      </div>
      <div
        className={cn(
          "[&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:font-mono",
        )}
        // Shiki output is server-rendered trusted HTML (the command is
        // constructed from a known config constant and a static prop).
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
