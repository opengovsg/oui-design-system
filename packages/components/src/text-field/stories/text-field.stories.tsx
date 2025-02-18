import type { Meta, StoryObj } from "@storybook/react"
import { TextField } from "../text-field"

export default {
  title: "Components/TextField",
  component: TextField,
} as Meta<typeof TextField>

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {},
}
