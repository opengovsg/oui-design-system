import { highlightCode } from "@/lib/shiki"
import type { NpmCommands } from "@/types/unist"

import { CommandTabs } from "./command-tabs"

export async function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<"pre"> & Required<NpmCommands>) {
  const tabs = {
    pnpm: __pnpmCommand__,
    npm: __npmCommand__,
    yarn: __yarnCommand__,
    bun: __bunCommand__,
  }

  const tabContentHtmls = await Promise.all(
    Object.entries(tabs).map(async ([, value]) => {
      return highlightCode(value, { lang: "bash" })
    }),
  )

  return (
    <div className="relative mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 dark:bg-zinc-900">
      <CommandTabs tabContentHtmls={tabContentHtmls} tabs={tabs} />
    </div>
  )
}
