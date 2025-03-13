import type { DateValue } from "@react-aria/calendar"
import type { Meta, StoryObj } from "@storybook/react"
import { useCallback } from "react"
import { isWeekend } from "@internationalized/date"
import { useLocale } from "react-aria"

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

export const UnavailableDates: Story = {
  render: (args) => {
    const { locale } = useLocale()
    const isDateUnavailable = useCallback(
      (date: DateValue) => isWeekend(date, locale),
      [locale],
    )

    return (
      <Calendar
        aria-label="Appointment date"
        {...args}
        isDateUnavailable={isDateUnavailable}
      />
    )
  },
}
