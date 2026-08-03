import { cn } from "@opengovsg/oui-theme"
import { withChromaticModes } from "@oui/chromatic"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import type { Key } from "react-aria"
import { expect, fn, userEvent, within } from "storybook/test"

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
    placeholder: "Type to search",
  },
}

export const DisabledKeys: Story = {
  args: {
    disabledKeys: ["1", "3", "5", "7", "9"],
  },
  decorators: [(storyFn) => <div className="h-[500px]">{storyFn()}</div>],
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Tag Field"))
  },
}

export const DefaultSelectedKeys: Story = {
  args: {
    defaultSelectedKeys: new Set(["1", "3", "5", "7", "9"]),
  },
}

const ControlledTemplate = (args: Story["args"]) => {
  type FieldState = {
    selectedKeys: Set<Key>
    inputValue: string
    // items: TagFieldItem[]
  }
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
      textValue: `This is an item ${i} with a fairly long text value`,
    })),
  },
}

export const NonVirtualized: Story = {
  args: {
    isVirtualized: false,
    defaultItems: [...Array(10)].map((_, i) => ({
      id: String(i),
      textValue: `Item ${i}`,
    })),
  },
  decorators: [(storyFn) => <div className="h-[500px]">{storyFn()}</div>],
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Tag Field"))
  },
}

export const KeepOpenOnSelect: Story = {
  args: {
    shouldCloseOnSelect: false,
    onSelectionChange: fn(),
    defaultItems: [...Array(10)].map((_, i) => ({
      id: String(i),
      textValue: `Item ${i}`,
    })),
  },
  decorators: [(storyFn) => <div className="h-[500px]">{storyFn()}</div>],
  play: async ({ canvasElement, canvas }) => {
    const body = within(canvasElement.parentElement!)
    await userEvent.click(canvas.getByLabelText("Tag Field"))
    const optionOne = await body.findByRole("option", { name: "Item 1" })
    const optionThree = body.getByRole("option", { name: "Item 3" })
    await userEvent.click(optionOne)
    await userEvent.click(optionThree)

    // Menu stays open and both options remain in the list, checked.
    await expect(optionOne).toBeVisible()
    await expect(optionOne).toHaveAttribute("data-selected", "true")
    await expect(optionThree).toHaveAttribute("data-selected", "true")

    // Clicking a selected option again deselects it.
    await userEvent.click(optionOne)
    await expect(optionOne).not.toHaveAttribute("data-selected")
  },
}

export const Sizes: Story = {
  render(args) {
    return (
      <div className="space-y-4">
        <TagField {...args} label={`${args.label} (xs)`} size="xs" />
        <TagField {...args} label={`${args.label} (sm)`} size="sm" />
        <TagField {...args} label={`${args.label} (md)`} size="md" />
      </div>
    )
  },
}

export const CustomItem: StoryObj<
  typeof TagField<{ id: string; textValue: string; description: string }>
> = {
  args: {
    // Keep this list smaller than the other virtualised stories: this story's
    // play function opens the popover, and rendering thousands of custom items
    // is heavy enough to time out on CI's slower runner. A few hundred items
    // still demonstrates virtualisation with a custom item renderer.
    defaultItems: [...Array(300)].map((_, i) => ({
      id: String(i),
      textValue: `Item ${i}`,
      description: "This item has a description",
    })),
    virtualRowHeight: 72,
    children: ({ item, key, isHighlighted, itemProps }) => {
      return (
        <div
          {...itemProps}
          key={key}
          className={cn(
            "flex flex-col gap-2 p-2",
            isHighlighted && "bg-blue-200",
          )}
        >
          <span>{item.textValue}</span>
          <span className="text-black">{item.description}</span>
        </div>
      )
    },
  },
  decorators: [(storyFn) => <div className="h-[500px]">{storyFn()}</div>],
  play: async ({ canvas }) => {
    userEvent.click(canvas.getByLabelText("Tag Field"))
  },
}
