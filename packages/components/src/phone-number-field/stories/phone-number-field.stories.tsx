import type { Meta, StoryObj } from "@storybook/react-vite"
import { PhoneNumberField } from "../PhoneNumberField"

export default {
  title: "Components/PhoneNumberField",
  component: PhoneNumberField,
} as Meta<typeof PhoneNumberField>

type Story = StoryObj<typeof PhoneNumberField>

export const Default: Story = {
  args: {},
}
