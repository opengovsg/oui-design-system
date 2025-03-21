import type { Meta, StoryObj } from "@storybook/react"
import { CalendarDate } from "@internationalized/date"

import { RangeCalendar } from "../range-calendar"

export default {
  title: "Components/RangeCalendar",
  component: RangeCalendar,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md"],
    },
  },
  parameters: {
    mockDate: new CalendarDate(2025, 3, 20),
  },
} as Meta<typeof RangeCalendar>

type Story = StoryObj<typeof RangeCalendar>

export const Default: Story = {
  args: {},
}
