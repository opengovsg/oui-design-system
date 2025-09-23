import type { DateValue } from "@react-aria/calendar"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useCallback } from "react"
import { CalendarDate, isWeekend } from "@internationalized/date"
import { withChromaticModes } from "@oui/chromatic"
import { useLocale } from "react-aria"
import { userEvent } from "storybook/test"

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

export const Default: Story = {}

export const Disabled: Story = {
  args: { isDisabled: true },
}

export const MultipleMonths: Story = {
  args: {
    visibleDuration: { months: 2 },
    defaultValue: {
      start: new CalendarDate(2025, 3, 13),
      end: new CalendarDate(2025, 4, 20),
    },
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
      <RangeCalendar
        aria-label="Appointment date"
        {...args}
        isDateUnavailable={isDateUnavailable}
      />
    )
  },
  play: async ({ canvas }) => {
    userEvent.click(
      canvas.getByRole("button", {
        name: /wednesday, 12 march 2025/i,
      }),
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
