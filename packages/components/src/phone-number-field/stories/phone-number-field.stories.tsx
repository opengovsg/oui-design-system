import "react-phone-number-input/style.css"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { isValidPhoneNumber } from "../index"
import { PhoneNumberField } from "../phone-number-field"

export default {
  title: "Components/PhoneNumberField",
  component: PhoneNumberField,
} as Meta<typeof PhoneNumberField>

type Story = StoryObj<typeof PhoneNumberField>

export const Default: Story = {
  args: {},
}

export const NoExamplePlaceholder: Story = {
  args: {
    placeholderMode: "off",
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Custom placeholder overrides example placeholders",
  },
}

export const WithLabelAndDescription: Story = {
  args: {
    label: "Contact number",
    description: "The contact number of the individual.",
  },
}

export const WithError: Story = {
  args: {
    label: "Contact number",
    errorMessage: "Please enter a valid contact number.",
    isInvalid: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Contact number",
    isDisabled: true,
  },
}

export const LocalVariant: Story = {
  args: {
    label: "Contact number",
    variant: "local",
    isDisabled: false,
  },
}

export const Sizes: Story = {
  render(args) {
    return (
      <div className="space-y-4">
        <PhoneNumberField {...args} label={`${args.label} (xs)`} size="xs" />
        <PhoneNumberField {...args} label={`${args.label} (sm)`} size="sm" />
        <PhoneNumberField {...args} label={`${args.label} (md)`} size="md" />
        <PhoneNumberField
          variant="local"
          {...args}
          label={`${args.label} (xs)`}
          size="xs"
        />
        <PhoneNumberField
          variant="local"
          {...args}
          label={`${args.label} (sm)`}
          size="sm"
        />
        <PhoneNumberField
          variant="local"
          {...args}
          label={`${args.label} (md)`}
          size="md"
        />
      </div>
    )
  },
  args: {
    label: "Contact number",
  },
}

export const WithValidation: Story = {
  render: (args) => {
    const [errorMessage, setErrorMessage] = useState<string>()

    return (
      <PhoneNumberField
        {...args}
        errorMessage={errorMessage}
        isInvalid={!!errorMessage}
        onChange={(value) => {
          if (value && !isValidPhoneNumber(value)) {
            setErrorMessage("Please enter a valid contact number.")
          } else {
            setErrorMessage(undefined)
          }
        }}
      />
    )
  },
  args: {
    label: "Contact number",
    defaultValue: "+659123456",
  },
  play: async ({ canvasElement, userEvent }) => {
    const input = canvasElement.querySelector("input") as HTMLInputElement

    // Simulate user input of an invalid phone number
    await userEvent.type(input, "123")
  },
}
