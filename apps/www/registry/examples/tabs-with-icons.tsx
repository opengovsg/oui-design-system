"use client"

import { Tab, TabList, TabPanel, Tabs } from "@opengovsg/oui"
import { FileText, Home, Settings } from "lucide-react"

export default function TabsWithIcons() {
  return (
    <Tabs>
      <TabList aria-label="App sections">
        <Tab id="home" startContent={<Home className="h-4 w-4" />}>
          Home
        </Tab>
        <Tab id="documents" startContent={<FileText className="h-4 w-4" />}>
          Documents
        </Tab>
        <Tab id="settings" endContent={<Settings className="h-4 w-4" />}>
          Settings
        </Tab>
      </TabList>
      <TabPanel id="home">Home content goes here.</TabPanel>
      <TabPanel id="documents">Documents content goes here.</TabPanel>
      <TabPanel id="settings">Settings content goes here.</TabPanel>
    </Tabs>
  )
}
