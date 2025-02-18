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
