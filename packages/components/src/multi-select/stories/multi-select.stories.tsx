import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "storybook/internal/preview-api"

import { MultiSelect } from "../multi-select"

export default {
  title: "Components/MultiSelect",
  component: MultiSelect,
} as Meta<typeof MultiSelect>

type Story = StoryObj<typeof MultiSelect>

export const Default: Story = {
  args: {
    defaultExpandedKeys: ["1"],
    items: [
      {
        id: "1",
        label: "Item 1",
        children: [
          {
            id: "1-1",
            optionLabel: "Item 1-1",
            selectedLabel: "Item 1-1",
          },
          {
            id: "1-2",
            optionLabel: "Item 1-2",
            selectedLabel: "Item 1-2",
          },
          {
            id: "1-3",
            optionLabel: "Item 1-3",
            selectedLabel: "Item 1-3",
          },
        ],
      },
      {
        id: "2",
        label: "Item 2",
        children: [
          {
            id: "2-1",
            optionLabel: "Item 2-1",
            selectedLabel: "Item 2-1",
          },
        ],
      },
      {
        id: "3",
        label: "Item 3",
        children: [
          {
            id: "3-1",
            optionLabel: "Item 3-1",
            selectedLabel: "Item 3-1",
          },
        ],
      },
    ],
    placeholder: "Select items",
    "aria-label": "MultiSelect",
  },
  render: (args) => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    return (
      <MultiSelect
        {...args}
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          console.log("> Selected keys:", keys)
          setSelectedKeys(keys ?? [])
        }}
      />
    )
  },
}

// TODO: Various sizes (sm, md, lg)
// TODO: With or Without "Clear All" Button
// TODO: More slots (classNames) for granular control.
