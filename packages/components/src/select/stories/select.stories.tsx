import type { Meta, StoryObj } from "@storybook/react-vite"
import type { Key } from "react-aria-components"
import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { ListBoxItem } from "react-aria-components"
import { userEvent } from "storybook/test"

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
  const [selectedKey, setSelectedKey] = useState<Key | null>("it")

  return (
    <>
      <Select {...args} value={selectedKey} onChange={setSelectedKey} />

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

export const WithSearch: Story = {
  args: {
    enableSearch: true,
    searchIcon: <SearchIcon className="text-base-content-subtle" />,
  },
  render: (args) => {
    return (
      <div className="space-y-4">
        <Select {...args} size="xs" label="Search (xs)" />
        <Select {...args} size="sm" label="Search (sm)" />
        <Select {...args} size="md" label="Search (md)" />
      </div>
    )
  },
}

export const WithSearchCustomPlaceholder: Story = {
  args: {
    label: "Language",
    enableSearch: true,
    searchPlaceholder: "Type to filter languages...",
  },
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Language"))
  },
}

export const WithSearchIcon: Story = {
  args: {
    label: "Language",
    description: "Search with a custom icon",
    enableSearch: true,
    searchPlaceholder: "Type to search...",
    searchIcon: <SearchIcon className="text-base-content-subtle size-4" />,
  },
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Language"))
  },
}

export const WithSearchCustomStyles: Story = {
  args: {
    label: "Language",
    description: "Customized search field styling",
    enableSearch: true,
    searchPlaceholder: "Type here...",
    searchIcon: <SearchIcon className="text-interaction-main-default size-5" />,
    classNames: {
      searchField:
        "bg-interaction-tinted-main-hover border-b-2 border-interaction-main-default px-4 py-3",
      searchInput:
        "text-base font-medium placeholder:text-interaction-main-default/50",
    },
  },
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Language"))
  },
}
