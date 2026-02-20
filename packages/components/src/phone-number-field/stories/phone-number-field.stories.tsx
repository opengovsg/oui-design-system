import "react-phone-number-input/style.css"

import type { Meta, StoryObj } from "@storybook/react-vite"

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
    label: "Date of issue",
    description: "The date when the document was issued.",
  },
}

export const WithError: Story = {
  args: {
    label: "Date of issue",
    errorMessage: "Please enter a valid date.",
    isInvalid: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Date of issue",
    isDisabled: true,
  },
}

export const Sizes: Story = {
  render(args) {
    return (
      <div className="space-y-4">
        <PhoneNumberField {...args} label={`${args.label} (xs)`} size="xs" />
        <PhoneNumberField {...args} label={`${args.label} (sm)`} size="sm" />
        <PhoneNumberField {...args} label={`${args.label} (md)`} size="md" />
      </div>
    )
  },
  args: {
    label: "Date of issue",
  },
}
