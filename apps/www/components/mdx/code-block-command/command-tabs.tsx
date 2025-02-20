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
      <TabList className="flex h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
        {Object.entries(tabs).map(([key]) => {
          return (
            <Tab
              id={key}
              key={key}
              className="selected:border-b-zinc-50 selected:bg-transparent selected:text-zinc-50 rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-zinc-400"
            >
              {key}
            </Tab>
          )
        })}
      </TabList>
      {Object.entries(tabs).map(([key, value], index) => {
        return (
          <TabPanel key={key} id={key} className="relative mt-0">
            <div
              className="code-highlight"
              dangerouslySetInnerHTML={{ __html: tabContentHtmls[index] }}
            />
            <CopyButton className="absolute top-0 right-4">{value}</CopyButton>
          </TabPanel>
        )
      })}
    </Tabs>
  )
}
