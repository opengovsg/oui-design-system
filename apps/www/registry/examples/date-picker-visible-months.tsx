"use client"

import { CalendarDate } from "@internationalized/date"
import { DatePicker } from "@opengovsg/oui"

export default function DatePickerVisibleMonths() {
  return (
    <DatePicker
      label="Event date"
      placeholderValue={new CalendarDate(2019, 7, 27)}
      calendarProps={{
        visibleDuration: { months: 2 },
      }}
    />
  )
}
