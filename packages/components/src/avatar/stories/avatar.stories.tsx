import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "../avatar"

export default {
  title: "Components/Avatar",
  component: Avatar,
} as Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {},
}
