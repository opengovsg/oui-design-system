import type { DateValue } from "@react-aria/calendar"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useCallback } from "react"
import { CalendarDate, isWeekend } from "@internationalized/date"
import { withChromaticModes } from "@oui/chromatic"
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
  parameters: {
    mockDate: new CalendarDate(2025, 3, 20),
  },
} as Meta<typeof Calendar>

type Story = StoryObj<typeof Calendar>

export const Default: Story = {}

export const Disabled: Story = {
  args: { isDisabled: true },
}

export const MultipleMonths: Story = {
  args: {
    visibleDuration: { months: 2 },
  },
  parameters: {
    chromatic: withChromaticModes(["desktop", "mobileSmall"]),
  },
}

export const MediumSizeMultipleMonths: Story = {
  args: {
    size: "md",
    visibleDuration: { months: 2 },
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

export const CustomFirstDayOfWeek: Story = {
  args: {
    firstDayOfWeek: "fri",
  },
}

export const SelectDateOnTodayButtonClick: Story = {
  args: {
    shouldSetDateOnTodayButtonClick: true,
  },
}

export const HideTodayButton: Story = {
  args: { showTodayButton: false },
}

export const HideOutsideMonths: Story = {
  args: {
    classNames: {
      cell: "outside-month:hidden",
    },
  },
}

export const WithMinValue: Story = {
  args: {
    minValue: new CalendarDate(2020, 0, 1),
  },
}
