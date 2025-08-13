import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "../checkbox"

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {},
}
