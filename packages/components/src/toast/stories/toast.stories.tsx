import type { Meta, StoryObj } from "@storybook/react-vite"
import { Toast } from "../toast"

export default {
  title: "Components/Toast",
  component: Toast,
} as Meta<typeof Toast>

type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {},
}
