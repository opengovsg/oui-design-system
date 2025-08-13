import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "../checkbox"

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    isDisabled: false,
    isIndeterminate: false,
    isInvalid: false,
    isReadOnly: false,
    isSelected: false,
  },
} as Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {},
}

export const Selected: Story = {
  args: {
    isSelected: true,
  },
}

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    isSelected: true,
  },
}

export const WithChildren: Story = {
  args: {
    children: "This is the checkbox label",
  },
}
