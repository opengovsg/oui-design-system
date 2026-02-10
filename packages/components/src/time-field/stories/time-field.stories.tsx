import type { Meta, StoryObj } from "@storybook/react-vite"
import { TimeField } from "../TimeField"

export default {
  title: "Components/TimeField",
  component: TimeField,
} as Meta<typeof TimeField>

type Story = StoryObj<typeof TimeField>

export const Default: Story = {
  args: {},
}
