import type { Meta, StoryObj } from "@storybook/react"
import { Check, Lock, X } from "lucide-react"
import { Text } from "react-aria-components"

import { Toggle, ToggleProps } from "../toggle"

export default {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Toggle>

type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    children: "Toggle",
  },
}

export const WithThumbIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Toggle
  thumbIcon={({ isSelected, className }) =>
    isSelected ? (
      <Check className={className} />
    ) : (
      <X className={className} />
    )
  }
/>`,
        language: "jsx",
        type: "auto",
      },
    },
  },
  args: {
    thumbIcon: (props) => {
      const { isSelected, className } = props
      return isSelected ? (
        <Check className={className} />
      ) : (
        <X className={className} />
      )
    },
  },
}

const ToggleWithThumbIcon = (props: ToggleProps) => {
  return (
    <Toggle
      {...props}
      thumbIcon={({ isSelected, className }) =>
        isSelected && <Lock className={className} />
      }
    />
  )
}

export const SizesAndStates: Story = {
  render: (args) => {
    return (
      <div className="grid w-fit grid-cols-4 gap-4">
        <Text />
        <Text>xs</Text>
        <Text>sm</Text>
        <Text>md</Text>
        <Text>Default</Text>
        <Toggle {...args} size="xs" />
        <Toggle {...args} size="sm" />
        <Toggle {...args} size="md" />
        <Text>isDisabled unSelected</Text>
        <Toggle {...args} size="xs" isDisabled />
        <Toggle {...args} size="sm" isDisabled />
        <Toggle {...args} size="md" isDisabled />
        <Text>isDisabled isSelected</Text>
        <Toggle {...args} size="xs" isDisabled isSelected />
        <Toggle {...args} size="sm" isDisabled isSelected />
        <Toggle {...args} size="md" isDisabled isSelected />
        <Text>isDisabled isSelected with Icon</Text>
        <ToggleWithThumbIcon {...args} size="xs" isSelected isDisabled />
        <ToggleWithThumbIcon {...args} size="sm" isSelected isDisabled />
        <ToggleWithThumbIcon {...args} size="md" isSelected isDisabled />
        <Text>isSelected with Icon</Text>
        <ToggleWithThumbIcon {...args} size="xs" isSelected />
        <ToggleWithThumbIcon {...args} size="sm" isSelected />
        <ToggleWithThumbIcon {...args} size="md" isSelected />
      </div>
    )
  },
  args: {},
}
