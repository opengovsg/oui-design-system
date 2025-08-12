import type { Meta, StoryObj } from "@storybook/react-vite"

import { DatePicker } from "../date-picker"

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: "color-contrast",
            selector: '*:not([data-placeholder="true"])',
          },
        ],
      },
    },
  },
} as Meta<typeof DatePicker>

type Story = StoryObj<typeof DatePicker>

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
        <DatePicker {...args} label={`${args.label} (xs)`} size="xs" />
        <DatePicker {...args} label={`${args.label} (sm)`} size="sm" />
        <DatePicker {...args} label={`${args.label} (md)`} size="md" />
      </div>
    )
  },
  args: {
    label: "Date of issue",
  },
}
