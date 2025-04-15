"use client"

import { useState } from "react"
import { Collection } from "react-aria-components"

import { Button, Tab, TabList, TabPanel, Tabs } from "@opengovsg/oui"

export default function TabsWithDynamicItems() {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Tab 1", content: "Tab body 1" },
    { id: 2, title: "Tab 2", content: "Tab body 2" },
    { id: 3, title: "Tab 3", content: "Tab body 3" },
  ])

  const addTab = () => {
    setTabs((tabs) => [
      ...tabs,
      {
        id: tabs.length + 1,
        title: `Tab ${tabs.length + 1}`,
        content: `Tab body ${tabs.length + 1}`,
      },
    ])
  }

  const removeTab = () => {
    if (tabs.length > 1) {
      setTabs((tabs) => tabs.slice(0, -1))
    }
  }

  return (
    <Tabs className="w-full">
      <div className="flex gap-2">
        <TabList className="flex-1" aria-label="Dynamic tabs" items={tabs}>
          {(item) => <Tab>{item.title}</Tab>}
        </TabList>
        <div className="group flex gap-1">
          <Button variant="outline" onPress={addTab}>
            Add tab
          </Button>
          <Button className="shrink-0" variant="outline" onPress={removeTab}>
            Remove tab
          </Button>
        </div>
      </div>
      <Collection items={tabs}>
        {(item) => <TabPanel>{item.content}</TabPanel>}
      </Collection>
    </Tabs>
  )
}
