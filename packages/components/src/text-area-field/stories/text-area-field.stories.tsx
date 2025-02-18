import type { Meta, StoryObj } from "@storybook/react"

import { TextAreaField } from "../text-area-field"

export default {
  title: "Components/TextAreaField",
  component: TextAreaField,
  args: {
    label: "Label",
    inputProps: {
      placeholder: "Type something",
    },
  },
} as Meta<typeof TextAreaField>

type Story = StoryObj<typeof TextAreaField>

export const Default: Story = {
  args: {},
}

export const WithoutLabel: Story = {
  args: {
    label: "",
  },
}

export const WithDescription: Story = {
  args: {
    description: "Max 200 characters",
  },
}

export const WithError: Story = {
  args: {
    errorMessage: "Something went wrong",
    isInvalid: true,
  },
}

export const IsDisabled: Story = {
  args: {
    defaultValue: "Field disabled",
    isDisabled: true,
  },
}

export const IsReadOnly: Story = {
  args: {
    defaultValue: "Field read only",
    isReadOnly: true,
  },
}
