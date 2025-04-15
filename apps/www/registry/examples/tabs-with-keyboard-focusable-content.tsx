import { Tab, TabList, TabPanel, Tabs, TextField } from "@opengovsg/oui"

export default function TabsWithFocusableContent() {
  return (
    <Tabs>
      <TabList aria-label="Notes app">
        <Tab id="1">Jane Doe</Tab>
        <Tab id="2">John Doe</Tab>
        <Tab id="3">Joe Bloggs</Tab>
      </TabList>
      <TabPanel id="1">
        <TextField label="Leave a note for Jane" />
      </TabPanel>
      <TabPanel id="2">Senatus Populusque Romanus.</TabPanel>
      <TabPanel id="3">Alea jacta est.</TabPanel>
    </Tabs>
  )
}
