import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tooltip } from "../tooltip"

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {},
}
