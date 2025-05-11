import type { Meta, StoryObj } from "@storybook/react-vite"
import type { Key } from "react-aria-components"
import { useState } from "react"
import { expect, userEvent, within } from "storybook/test"
import { ListBoxItem, useFilter } from "react-aria-components"

import type { ComboBoxProps } from "../combo-box"
import { ComboBox } from "../combo-box"
import { ComboBoxItem } from "../combo-box-item"

const defaultItems = [...Array(10)].map((_, i) => ({
  id: String(i),
  textValue: `Item ${i}`,
}))

export default {
  title: "Components/ComboBox",
  component: ComboBox,
  args: {
    label: "Ice cream flavour",
    defaultItems: defaultItems,
    isDisabled: false,
    onClear: undefined,
    children: (item) => <ComboBoxItem>{item.textValue}</ComboBoxItem>,
  },
} as Meta<typeof ComboBox<(typeof defaultItems)[0]>>

type Story = StoryObj<typeof ComboBox<(typeof defaultItems)[0]>>

export const Default: Story = {
  args: {},
}

export const WithSelection: Story = {
  args: {
    inputValue: "Item 1",
    selectedKey: "1",
  },
}

export const NoMatch: Story = {
  decorators: [(storyFn) => <div className="h-[500px]">{storyFn()}</div>],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!)
    const inputElem = canvas.getByRole("combobox")
    await userEvent.type(inputElem, "No match")

    expect(
      canvas.findByText("No matching results"),
    ).resolves.toBeInTheDocument()
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    inputValue: "Item 1",
  },
}

export const WithError: Story = {
  args: {
    errorMessage: "Something went wrong",
    isInvalid: true,
  },
}

export const WithDescription: Story = {
  args: {
    description: "Pick your favourite flavour",
  },
}

export const CustomComboboxItem: Story = {
  args: {
    children: (item) => (
      <ListBoxItem className="bg-red-400">{item.textValue}</ListBoxItem>
    ),
  },
}

export const WithExpandedSuggestions: Story = {
  decorators: [(storyFn) => <div className="h-[500px]">{storyFn()}</div>],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!)
    const expandElem = canvas.getByRole("button", {
      name: /show suggestions ice cream flavour/i,
    })
    expandElem.click()
    expect(
      canvas.findByRole("option", { name: /item 0/i }),
    ).resolves.toBeInTheDocument()
  },
  parameters: {
    // This option disables all automatic a11y checks on this story,
    // since there are false positives
    a11y: { test: "todo" },
  },
}

export const Virtualised: Story = {
  args: {
    defaultItems: [
      {
        id: "very long",
        textValue:
          "very longvery longvery longvery longvery longvery longvery longvery longvery longvery longvery longvery longvery long",
      },
      ...[...Array(2000)].map((_, i) => ({
        id: String(i),
        textValue: `Item ${i}`,
      })),
    ],
  },
}

export const TriggerOnFocus: Story = {
  args: {
    label: "Click on the input to automatically trigger the menu",
    menuTrigger: "focus",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!)
    const inputElem = canvas.getByRole("combobox")
    userEvent.click(inputElem)

    expect(
      canvas.findByRole("option", { name: /item 0/i }),
    ).resolves.toBeInTheDocument()
  },
}

const ControlledComboBoxTemplate = ({
  items = [],
  ...props
}: ComboBoxProps<(typeof defaultItems)[0]>) => {
  const { contains } = useFilter({ sensitivity: "base" })
  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null
    inputValue: string
  }>({
    selectedKey: null,
    inputValue: "",
  })
  const [filteredItems, setFilteredItems] = useState(items)

  const onSelectionChange = (id: Key | null) => {
    setFieldState({
      inputValue: items.find((o) => o.id === id)?.textValue ?? "",
      selectedKey: id,
    })
    // Reset items
    setFilteredItems(items)
  }

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
    }))
    setFilteredItems(
      items.filter((item) => contains(item.textValue, fieldState.inputValue)),
    )
  }

  const onClear = () => {
    setFieldState({ selectedKey: null, inputValue: "" })
    setFilteredItems(items)
  }

  return (
    <>
      <p>Current selected major id: {fieldState.selectedKey}</p>
      <p>Current input text: {fieldState.inputValue}</p>
      <ComboBox
        {...props}
        label="Pick an engineering major"
        items={filteredItems}
        selectedKey={fieldState.selectedKey}
        inputValue={fieldState.inputValue}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
        onClear={onClear}
      />
    </>
  )
}

export const FullyControlled: Story = {
  render(args) {
    return <ControlledComboBoxTemplate {...args} />
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react"
import { Key, useFilter } from "react-aria-components"

const ControlledComboBoxTemplate = ({
  items = [],
  ...props
}: ComboBoxProps) => {
  const { contains } = useFilter({ sensitivity: "base" })
  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null
    inputValue: string
  }>({
    selectedKey: null,
    inputValue: "",
  })
  const [filteredItems, setFilteredItems] = useState(items)

  const onSelectionChange = (id: Key | null) => {
    setFieldState({
      inputValue: items.find((o) => o.value === id)?.name ?? "",
      selectedKey: id,
    })
    // Reset items
    setFilteredItems(items)
  }

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
    }))
    setFilteredItems(
      items.filter((item) => contains(item.name, fieldState.inputValue)),
    )
  }

  const onClear = () => {
    setFieldState({ selectedKey: null, inputValue: "" })
    setFilteredItems(items)
  }

  return (
    <>
      <p>Current selected major id: {fieldState.selectedKey}</p>
      <p>Current input text: {fieldState.inputValue}</p>
      <ComboBox
        {...props}
        label="Pick an engineering major"
        items={filteredItems}
        selectedKey={fieldState.selectedKey}
        inputValue={fieldState.inputValue}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
        onClear={onClear}
      />
    </>
  )
}`,
        language: "jsx",
        type: "auto",
      },
    },
  },
  args: {
    items: [
      { id: String(1), textValue: "Aerospace" },
      { id: String(2), textValue: "Mechanical" },
      { id: String(3), textValue: "Civil" },
      { id: String(4), textValue: "Biomedical" },
      { id: String(5), textValue: "Nuclear" },
      { id: String(6), textValue: "Industrial" },
      { id: String(7), textValue: "Chemical" },
      { id: String(8), textValue: "Agricultural" },
      { id: String(9), textValue: "Electrical" },
    ],
    size: "md",
  },
}

export const Sizes: Story = {
  render(args) {
    return (
      <div className="space-y-4">
        <ComboBox {...args} label={`${args.label} (xs)`} size="xs" />
        <ComboBox {...args} label={`${args.label} (sm)`} size="sm" />
        <ComboBox {...args} label={`${args.label} (md)`} size="md" />
      </div>
    )
  },
  args: {
    onClear: () => {},
    menuTrigger: "focus",
  },
}
