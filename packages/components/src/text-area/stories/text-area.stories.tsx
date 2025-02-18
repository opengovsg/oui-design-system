import type { Meta, StoryObj } from "@storybook/react"
import { TextArea } from "../text-area"

export default {
  title: "Components/TextArea",
  component: TextArea,
} as Meta<typeof TextArea>

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {},
}
