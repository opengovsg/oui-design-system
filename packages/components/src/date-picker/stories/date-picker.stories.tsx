import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "../date-picker"

export default {
  title: "Components/DatePicker",
  component: DatePicker,
} as Meta<typeof DatePicker>

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {},
}
