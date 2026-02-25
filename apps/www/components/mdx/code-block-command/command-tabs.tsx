"use client"

import { useConfig } from "@/hooks/use-config"

import { Tab, TabList, TabPanel, Tabs } from "@opengovsg/oui"

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
    <div className="dark">
      <Tabs
        prominence="normal"
        selectedKey={packageManager}
        onSelectionChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          })
        }}
      >
        <div className="flex justify-between gap-2 px-4 py-2">
          <TabList>
            {Object.entries(tabs).map(([key]) => {
              return (
                <Tab id={key} key={key}>
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
    </div>
  )
}
