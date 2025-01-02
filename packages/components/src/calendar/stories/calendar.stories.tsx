import type { Meta, StoryObj } from "@storybook/react"

import { Calendar } from "../calendar"

export default {
  title: "Components/Calendar",
  component: Calendar,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md"],
    },
  },
} as Meta<typeof Calendar>

type Story = StoryObj<typeof Calendar>

export const Default: Story = {}

export const Sizes: Story = {
  args: {
    size: "sm",
  },
}
