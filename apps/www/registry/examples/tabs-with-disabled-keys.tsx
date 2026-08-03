"use client"

import { Tab, TabList, TabPanel, Tabs } from "@opengovsg/oui"
import { Collection } from "react-aria-components"

export default function TabsWithDisabledItems() {
  const tabs = [
    { id: 1, title: "Mouse settings" },
    { id: 2, title: "Keyboard settings" },
    { id: 3, title: "Gamepad settings" },
  ]

  return (
    <Tabs disabledKeys={[2]}>
      <TabList aria-label="Input settings" items={tabs}>
        {(item) => <Tab>{item.title}</Tab>}
      </TabList>
      <Collection items={tabs}>
        {(item) => <TabPanel>{item.title}</TabPanel>}
      </Collection>
    </Tabs>
  )
}
