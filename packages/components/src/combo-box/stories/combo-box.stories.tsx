import type { Meta, StoryObj } from "@storybook/react"
import type { Key } from "react-aria-components"
import { useState } from "react"
import { expect, waitFor, within } from "@storybook/test"
import { ListBoxItem, useFilter } from "react-aria-components"

import { ComboBox, ComboBoxProps } from "../combo-box"

export default {
  title: "Components/ComboBox",
  component: ComboBox,
  args: {
    label: "Ice cream flavour",
    defaultItems: [...Array(10)].map((_, i) => ({
      value: String(i),
      name: `Item ${i}`,
    })),
    isDisabled: false,
    onClear: undefined,
  },
} as Meta<typeof ComboBox>

type Story = StoryObj<typeof ComboBox>

export const Default: Story = {
  args: {},
}

export const WithSelection: Story = {
  args: {
    inputValue: "Item 1",
    selectedKey: "1",
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
      <ListBoxItem className="bg-red-400" id={item.value}>
        {item.name}
      </ListBoxItem>
    ),
  },
}

export const WithExpandedSuggestions: Story = {
  play: async ({ canvasElement }) => {
    if (!canvasElement.parentElement) {
      throw new Error("Canvas element not found")
    }
    const canvas = within(canvasElement.parentElement)
    const expandElem = canvas.getByRole("button", {
      name: /show suggestions ice cream flavour/i,
    })
    expandElem.click()
    waitFor(() => {
      expect(
        canvas.getByRole("option", { name: /item 0/i }),
      ).toBeInTheDocument()
    })
  },
}

export const Virtualised: Story = {
  args: {
    defaultItems: [
      {
        value: "very long",
        name: "very longvery longvery longvery longvery longvery longvery longvery longvery longvery longvery longvery longvery long",
      },
      ...[...Array(2000)].map((_, i) => ({
        value: String(i),
        name: `Item ${i}`,
      })),
    ],
  },
}

export const TriggerOnFocus: Story = {
  args: {
    menuTrigger: "focus",
  },
}

const ControlledComboBoxTemplate = ({ items, ...props }: ComboBoxProps) => {
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

const ControlledComboBoxTemplate = ({ items, ...props }: ComboBoxProps) => {
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
      { value: String(1), name: "Aerospace" },
      { value: String(2), name: "Mechanical" },
      { value: String(3), name: "Civil" },
      { value: String(4), name: "Biomedical" },
      { value: String(5), name: "Nuclear" },
      { value: String(6), name: "Industrial" },
      { value: String(7), name: "Chemical" },
      { value: String(8), name: "Agricultural" },
      { value: String(9), name: "Electrical" },
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
  },
}
