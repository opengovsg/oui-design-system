import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "../checkbox"

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    size: "md",
    isDisabled: false,
    isIndeterminate: false,
    isInvalid: false,
    isReadOnly: false,
    isSelected: false,
    children:
      "Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow Checkbox label overflow ",
  },
} as Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {},
}

export const States: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-4">
        <Checkbox {...args}>Unselected</Checkbox>
        <Checkbox {...args} isSelected>
          Selected
        </Checkbox>
        <Checkbox {...args} isIndeterminate>
          Indeterminate
        </Checkbox>
        <Checkbox {...args} isDisabled isSelected={false}>
          Disabled unselected
        </Checkbox>
        <Checkbox {...args} isDisabled isSelected>
          Disabled selected
        </Checkbox>
        <Checkbox {...args} isInvalid isSelected={false}>
          Invalid unselected
        </Checkbox>
        <Checkbox {...args} isInvalid isSelected>
          Invalid selected
        </Checkbox>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-4">
        <Checkbox {...args} size="xs">
          Extra Small
        </Checkbox>
        <Checkbox {...args} size="sm">
          Small
        </Checkbox>
        <Checkbox {...args} size="md">
          Medium
        </Checkbox>
      </div>
    )
  },
  args: {
    isSelected: true,
  },
}
