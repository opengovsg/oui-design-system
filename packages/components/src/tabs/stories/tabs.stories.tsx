import type { Meta, StoryObj } from "@storybook/react-vite"
import { AmphoraIcon, HouseIcon, WarehouseIcon } from "lucide-react"
import { useState } from "react"
import type { TabsProps } from "react-aria-components"
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
  argTypes: {
    prominence: {
      control: {
        type: "select",
      },
      options: ["normal", "strong"],
    },
    orientation: {
      control: {
        type: "select",
      },
      options: ["horizontal", "vertical"],
    },
  },
} as Meta<typeof Tabs>

type Story = StoryObj<typeof Tabs>

const Template = (args: TabsProps) => (
  <Tabs {...args}>
    <TabList aria-label="History of Ancient Rome">
      <Tab key={Math.random()} id="FoR">
        Founding of Rome
      </Tab>
      <Tab key={Math.random()} id="MaR">
        Monarchy and Republic
      </Tab>
      <Tab key={Math.random()} id="Emp">
        Empire
      </Tab>
    </TabList>
    <TabPanel id="FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
    <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
    <TabPanel id="Emp">Alea jacta est.</TabPanel>
  </Tabs>
)

export const Default: Story = {
  args: {},
  render: Template,
  name: "Underlined/Default",
}

export const DarkModeHorizontal: Story = {
  parameters: {
    // This option disables all automatic a11y checks on this story,
    // since the transitions are causing false positives
    a11y: { test: "todo" },
  },
  globals: {
    theme: "dark",
    backgrounds: { value: "dark" },
  },
  render(args) {
    return (
      <div className="dark">
        <Template {...args} />
      </div>
    )
  },
  args: {
    orientation: "horizontal",
  },
  name: "Underlined/Dark Mode Horizontal",
}

export const NormalProminence: Story = {
  args: {
    prominence: "normal",
  },
  render: Template,
  name: "Underlined/Normal Prominence",
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: Template,
  name: "Underlined/Disabled",
}

export const VerticalOrientation: Story = {
  args: {
    orientation: "vertical",
  },
  render: Template,
  name: "Underlined/Vertical",
}

export const VerticalWithStartAndEndContent: Story = {
  args: {
    orientation: "vertical",
    prominence: "normal",
  },
  render(args) {
    return (
      <Tabs {...args}>
        <TabList aria-label="History of Ancient Rome">
          <Tab
            id="FoR"
            startContent={<HouseIcon />}
            endContent={<span className="flex-1 text-end">100,000</span>}
          >
            Founding of Rome
          </Tab>
          <Tab
            id="MaR"
            startContent={<WarehouseIcon />}
            endContent={<span className="flex-1 text-end">300</span>}
          >
            Monarchy and Republic
          </Tab>
          <Tab id="Emp" startContent={<AmphoraIcon />}>
            Empire
          </Tab>
        </TabList>
        <TabPanel id="FoR">
          Arma virumque cano, Troiae qui primus ab oris.
        </TabPanel>
        <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
        <TabPanel id="Emp">Alea jacta est.</TabPanel>
      </Tabs>
    )
  },
  name: "Underlined/Vertical with start and end content",
}

export const DarkModeVertical: Story = {
  parameters: DarkModeHorizontal.parameters,
  globals: DarkModeHorizontal.globals,
  render: DarkModeHorizontal.render,
  args: {
    orientation: "vertical",
  },
  name: "Underlined/Dark Mode Vertical",
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
  name: "Underlined/Dynamic Tabs",
}

export const Bordered: Story = {
  args: {
    variant: "bordered",
  },
  render: Template,
  name: "Bordered/Default",
}

export const BorderedDisabled: Story = {
  args: {
    variant: "bordered",
    isDisabled: true,
  },
  render: Template,
  name: "Bordered/Disabled",
}
