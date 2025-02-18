import type { Meta, StoryObj } from "@storybook/react"
import { ComboBox } from "../combo-box"

export default {
  title: "Components/ComboBox",
  component: ComboBox,
} as Meta<typeof ComboBox>

type Story = StoryObj<typeof ComboBox>

export const Default: Story = {
  args: {},
}
