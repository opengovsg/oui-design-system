import type { Meta, StoryObj } from "@storybook/react-vite"

import { DateField } from "../date-field"

export default {
  title: "Components/DateField",
  component: DateField,
} as Meta<typeof DateField>

type Story = StoryObj<typeof DateField>

export const Default: Story = {
  args: {},
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
        <DateField {...args} label={`${args.label} (xs)`} size="xs" />
        <DateField {...args} label={`${args.label} (sm)`} size="sm" />
        <DateField {...args} label={`${args.label} (md)`} size="md" />
      </div>
    )
  },
  args: {
    label: "Date of issue",
  },
}
