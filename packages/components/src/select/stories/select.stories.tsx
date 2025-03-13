import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { userEvent, within } from "@storybook/test"
import { Key, ListBoxItem } from "react-aria-components"

import { Select, SelectProps } from "../select"

export default {
  title: "Components/Select",
  component: Select,
  args: {
    "aria-label": "Label added for a11y, please add a label prop if using",
    items: [
      { textValue: "English", id: "en" },
      { textValue: "Spanish", id: "es" },
      { textValue: "French", id: "fr" },
      { textValue: "German", id: "de" },
      { textValue: "Italian", id: "it" },
      { textValue: "Japanese", id: "ja" },
      { textValue: "Korean", id: "ko" },
      { textValue: "Chinese", id: "zh" },
    ],
  },
} as Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: "Language",
  },
}

export const WithSearch: Story = {
  args: {
    label: "Language",
    showSearch: true,
    searchPlaceholder: "Search for a language",
  },
  play: async ({ canvasElement }) => {
    // Because popover is rendered outside of the story canvas
    const canvas = within(canvasElement.parentElement!)
    userEvent.click(canvas.getByLabelText("Language"))

    // Wait for the search input to appear
    const searchElem = await canvas.findByLabelText("Search")
    userEvent.click(searchElem)
    userEvent.type(searchElem, "ish")
  },
}

export const Disabled: Story = {
  args: {
    label: "Language",
    isDisabled: true,
  },
}

export const WithCustomItem: Story = {
  args: {
    label: "Language",
    children: (item) => (
      <ListBoxItem className="bg-blue-300 focus:bg-blue-400">
        {item.textValue}
      </ListBoxItem>
    ),
  },
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Language"))
  },
}

const ControlledTemplate = (args: SelectProps) => {
  const [selectedKey, setSelectedKey] = useState<Key>("it")

  return (
    <>
      <Select
        {...args}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      />

      <span>Current selected key: {selectedKey ?? "null"}</span>
    </>
  )
}

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    label: "Languages (controlled)",
  },
}
