import type { Meta, StoryObj } from "@storybook/react"
import type { Key } from "react-aria"
import { useState } from "react"
import { cn } from "@opengovsg/oui-theme"
import { withChromaticModes } from "@oui/chromatic"

import { TagField } from "../tag-field"

export default {
  title: "Components/TagField",
  component: TagField,
  args: {
    label: "Tag Field",
    defaultItems: [...Array(100)].map((_, i) => ({
      id: String(i),
      textValue: `Item ${i}`,
    })),
  },
} as Meta<typeof TagField>

type Story = StoryObj<typeof TagField>

export const Default: Story = {
  args: {
    description: "A tag field component.",
  },
}

export const DisabledKeys: Story = {
  args: {
    disabledKeys: ["1", "3", "5", "7", "9"],
  },
}

type FieldState = {
  selectedKeys: Set<Key>
  inputValue: string
  // items: TagFieldItem[]
}

const ControlledTemplate = (args: Story["args"]) => {
  const defaultItems = [...Array(100)].map((_, i) => ({
    id: String(i),
    textValue: `Item ${i}`,
  }))
  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKeys: new Set(),
    inputValue: "",
    // Can also explicitly control the items
    // items: defaultItems,
  })

  // const { startsWith } = useFilter({ sensitivity: "base" })

  const onSelectionChange = (keys: Set<Key>) => {
    setFieldState({
      inputValue: "",
      selectedKeys: keys,
      // items: items.filter((item) => keys.has(item.id)),
    })
  }

  // Specify how each of the Autocomplete values should change when the input
  // field is altered by the user
  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKeys: prevState.selectedKeys,
      // items: items.filter((item) => startsWith(item.textValue, value)),
    }))
  }

  return (
    <TagField
      {...args}
      defaultItems={defaultItems}
      // items={fieldState.items}
      inputValue={fieldState.inputValue}
      selectedKeys={fieldState.selectedKeys}
      onInputChange={onInputChange}
      onSelectionChange={onSelectionChange}
    />
  )
}

// Expected API of the component
export const Controlled: Story = {
  args: {},
  render: ControlledTemplate,
}

export const WithDefaultSelection: Story = {
  args: {
    defaultSelectedKeys: new Set(["1", "3", "5", "7", "9"]),
  },
  parameters: {
    chromatic: withChromaticModes(["mobileSmall", "desktop"]),
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultSelectedKeys: new Set(["1", "3"]),
  },
}

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultSelectedKeys: new Set(["2", "5"]),
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

export const Virtualized: Story = {
  args: {
    defaultItems: [...Array(3000)].map((_, i) => ({
      id: String(i),
      textValue: `Item ${i}`,
    })),
  },
}

export const CustomItem: Story = {
  args: {
    children: ({ item, itemProps, key, isHighlighted }) => (
      <div
        {...itemProps}
        key={key}
        className={cn(isHighlighted && "bg-blue-200")}
      >
        {item.textValue}
      </div>
    ),
  },
}
