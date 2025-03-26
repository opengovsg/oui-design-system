import type { Meta, StoryObj } from "@storybook/react"
import { Menu } from "../menu"

export default {
  title: "Components/Menu",
  component: Menu,
} as Meta<typeof Menu>

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {},
}
