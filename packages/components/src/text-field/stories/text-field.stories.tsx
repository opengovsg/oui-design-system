import type { Meta, StoryObj } from "@storybook/react"

import { TextField } from "../text-field"

export default {
  title: "Components/TextField",
  component: TextField,
  args: {
    label: "Label",
    inputProps: {
      placeholder: "Type something",
    },
  },
} as Meta<typeof TextField>

type Story = StoryObj<typeof TextField>

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
