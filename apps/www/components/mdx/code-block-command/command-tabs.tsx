"use client"

import { useConfig } from "@/hooks/use-config"
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components"

import { CopyButton } from "../copy-button"

interface CommandTabsProps {
  tabContentHtmls: string[]
  tabs: {
    pnpm: string
    npm: string
    yarn: string
    bun: string
  }
}

export const CommandTabs = ({ tabContentHtmls, tabs }: CommandTabsProps) => {
  const [config, setConfig] = useConfig()

  const packageManager = config.packageManager || "pnpm"

  return (
    <Tabs
      selectedKey={packageManager}
      onSelectionChange={(value) => {
        setConfig({
          ...config,
          packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
        })
      }}
    >
      <div className="flex justify-between gap-2 px-4 py-2">
        <TabList className="flex h-7 flex-1 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
          {Object.entries(tabs).map(([key]) => {
            return (
              <Tab
                id={key}
                key={key}
                className="selected:border-b-zinc-50 selected:bg-transparent selected:text-zinc-50 cursor-pointer rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-zinc-400 transition-colors hover:text-zinc-50"
              >
                {key}
              </Tab>
            )
          })}
        </TabList>

        <CopyButton>{tabs[config.packageManager]}</CopyButton>
      </div>
      {Object.entries(tabs).map(([key], index) => {
        return (
          <TabPanel key={key} id={key} className="relative mt-0">
            <div
              className="code-highlight px-4 pt-2 pb-6 font-mono text-sm font-normal"
              dangerouslySetInnerHTML={{ __html: tabContentHtmls[index] }}
            />
          </TabPanel>
        )
      })}
    </Tabs>
  )
}
