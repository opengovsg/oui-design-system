import type { Meta, StoryObj } from "@storybook/react-vite"
import { NumberField } from "../NumberField"

export default {
  title: "Components/NumberField",
  component: NumberField,
} as Meta<typeof NumberField>

type Story = StoryObj<typeof NumberField>

export const Default: Story = {
  args: {},
}
