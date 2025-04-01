import type { Meta, StoryObj } from "@storybook/react"
import type { Key } from "react-aria-components"
import { useState } from "react"
import { userEvent } from "@storybook/test"
import { ListBoxItem } from "react-aria-components"

import type { SelectProps } from "../select"
import { Select } from "../select"
import { SelectItem } from "../select-item"

const defaultItems = [
  { textValue: "English", id: "en" },
  { textValue: "Spanish", id: "es" },
  { textValue: "French", id: "fr" },
  { textValue: "German", id: "de" },
  { textValue: "Italian", id: "it" },
  { textValue: "Japanese", id: "ja" },
  { textValue: "Korean", id: "ko" },
  { textValue: "Chinese", id: "zh" },
]

export default {
  title: "Components/Select",
  component: Select,
  args: {
    "aria-label": "Label added for a11y, please add a label prop if using",
    items: defaultItems,
    children: (item) => <SelectItem>{item.textValue}</SelectItem>,
  },
} as Meta<typeof Select<(typeof defaultItems)[0]>>

type Story = StoryObj<typeof Select<(typeof defaultItems)[0]>>

export const Default: Story = {
  args: {},
}

export const WithLabelAndDescription: Story = {
  args: {
    label: "Language",
    description: "Select your preferred language",
  },
}

export const Disabled: Story = {
  args: {
    label: "Language",
    isDisabled: true,
  },
}

export const Invalid: Story = {
  args: {
    isInvalid: true,
    errorMessage: "Please select a language",
  },
}

export const WithCustomItem: Story = {
  tags: ["skip-test"],
  args: {
    label: "Language",
    children: (item) => (
      <ListBoxItem className="bg-blue-50 text-black focus:bg-blue-100">
        {item.textValue}
      </ListBoxItem>
    ),
  },
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Language"))
  },
}

const ControlledTemplate = (args: SelectProps<(typeof defaultItems)[0]>) => {
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

export const CustomClasses: Story = {
  args: {
    label: "Custom classes",
    classNames: {
      base: "bg-blue-100",
      trigger: "bg-red-200 pressed:bg-red-300",
      popover: "bg-green-300 w-[400px]",
      selectedText: "text-gray-800",
    },
  },
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Custom classes"))
  },
}

export const Virtualized: Story = {
  args: {
    placeholder: "YYYY",
    items: Array.from({ length: 1000 }).map((_, number) => ({
      textValue: String(number + 1900),
      id: String(number + 1900),
    })),
    label: "Year of birth",
  },
}

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <Select {...args} size="xs" label="Extra small" />
        <Select {...args} size="sm" label="Small" />
        <Select {...args} size="md" label="Medium" />
      </div>
    )
  },
}
