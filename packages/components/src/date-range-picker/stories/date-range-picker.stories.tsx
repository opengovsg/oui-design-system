import type { Meta, StoryObj } from "@storybook/react-vite"

import { DateRangePicker } from "../date-range-picker"

export default {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
} as Meta<typeof DateRangePicker>

type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {
  args: {},
}

export const WithLabelAndDescription: Story = {
  args: {
    label: "Duration of issue",
    description: "How long the issue is expected to last.",
  },
}

export const WithError: Story = {
  args: {
    label: "Duration of issue",
    errorMessage: "Please enter a valid date.",
    isInvalid: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Duration of issue",
    isDisabled: true,
  },
}

export const Sizes: Story = {
  render(args) {
    return (
      <div className="space-y-4">
        <DateRangePicker {...args} label={`${args.label} (xs)`} size="xs" />
        <DateRangePicker {...args} label={`${args.label} (sm)`} size="sm" />
        <DateRangePicker {...args} label={`${args.label} (md)`} size="md" />
      </div>
    )
  },
  args: {
    label: "Duration of issue",
  },
}
