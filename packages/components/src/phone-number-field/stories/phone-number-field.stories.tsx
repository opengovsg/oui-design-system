import "react-phone-number-input/style.css"

import type { Meta, StoryObj } from "@storybook/react-vite"

import { PhoneInput } from "../phone-input2"

export default {
  title: "Components/PhoneNumberField",
  component: PhoneInput,
} as Meta<typeof PhoneInput>

type Story = StoryObj<typeof PhoneInput>

export const Default: Story = {
  args: {},
}
