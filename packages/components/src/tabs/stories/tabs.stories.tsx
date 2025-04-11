import type { Meta, StoryObj } from "@storybook/react"
import type { TabsProps } from "react-aria-components"
import { useState } from "react"
import { Collection } from "react-aria-components"

import { Button } from "../../button"
import { Tab, TabList, TabPanel, Tabs } from "../tabs"

// @ts-expect-error For storybook code preview to retrieve the component name
Collection.displayName = "Collection"

export default {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: {
    TabList,
    Tab,
    TabPanel,
  },
} as Meta<typeof Tabs>

type Story = StoryObj<typeof Tabs>

const Template = (args: TabsProps) => (
  <Tabs {...args}>
    <TabList aria-label="History of Ancient Rome">
      <Tab id="FoR">Founding of Rome</Tab>
      <Tab id="MaR">Monarchy and Republic</Tab>
      <Tab id="Emp">Empire</Tab>
    </TabList>
    <TabPanel id="FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
    <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
    <TabPanel id="Emp">Alea jacta est.</TabPanel>
  </Tabs>
)

export const Default: Story = {
  args: {},
  render: Template,
}

export const VerticalOrientation: Story = {
  args: {
    orientation: "vertical",
  },
  render: Template,
}

export const DynamicTabs: Story = {
  args: {},
  render: (args: TabsProps) => {
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
      <Tabs {...args}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button variant="outline" onPress={addTab}>
              Add tab
            </Button>
            <Button variant="outline" onPress={removeTab}>
              Remove tab
            </Button>
          </div>
          <TabList aria-label="Dynamic tabs" items={tabs} className="flex-1">
            {(item) => <Tab>{item.title}</Tab>}
          </TabList>
        </div>
        <Collection items={tabs}>
          {(item) => <TabPanel>{item.content}</TabPanel>}
        </Collection>
      </Tabs>
    )
  },
}
