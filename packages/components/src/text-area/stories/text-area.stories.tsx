import type { Meta, StoryObj } from "@storybook/react"

import { TextArea } from "../text-area"

export default {
  title: "Components/TextArea",
  component: TextArea,
  args: {
    placeholder:
      "Remember to have a placeholder or aria-label for this component to be accessible",
  },
} as Meta<typeof TextArea>

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {},
}

export const Sizes: Story = {
  render(args) {
    return (
      <div className="space-y-4">
        <TextArea {...args} placeholder="xs" size="xs" />
        <TextArea {...args} placeholder="sm" size="sm" />
        <TextArea {...args} placeholder="md" size="md" />
      </div>
    )
  },
}
