import type { Meta, StoryObj } from "@storybook/react"
import { DateField } from "../date-field"

export default {
  title: "Components/DateField",
  component: DateField,
} as Meta<typeof DateField>

type Story = StoryObj<typeof DateField>

export const Default: Story = {
  args: {},
}
