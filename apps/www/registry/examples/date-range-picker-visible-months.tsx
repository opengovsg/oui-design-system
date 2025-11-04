"use client"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerVisibleMonths() {
  return (
    <DateRangePicker
      label="Event date"
      calendarProps={{ visibleDuration: { months: 3 } }}
    />
  )
}
