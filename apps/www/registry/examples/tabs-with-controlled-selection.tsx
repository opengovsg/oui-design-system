"use client"

import { Tab, TabList, TabPanel, Tabs } from "@opengovsg/oui"
import { useState } from "react"
import type { Key } from "react-aria-components"

export default function TabsWithControlledSelection() {
  const [timePeriod, setTimePeriod] = useState<Key>("triassic")

  return (
    <div className="flex flex-col gap-4">
      <p>Selected time period: {timePeriod}</p>
      <Tabs selectedKey={timePeriod} onSelectionChange={setTimePeriod}>
        <TabList aria-label="Mesozoic time periods">
          <Tab id="triassic">Triassic</Tab>
          <Tab id="jurassic">Jurassic</Tab>
          <Tab id="cretaceous">Cretaceous</Tab>
        </TabList>
        <TabPanel id="triassic">
          The Triassic ranges roughly from 252 million to 201 million years ago,
          preceding the Jurassic Period.
        </TabPanel>
        <TabPanel id="jurassic">
          The Jurassic ranges from 200 million years to 145 million years ago.
        </TabPanel>
        <TabPanel id="cretaceous">
          The Cretaceous is the longest period of the Mesozoic, spanning from
          145 million to 66 million years ago.
        </TabPanel>
      </Tabs>
    </div>
  )
}
