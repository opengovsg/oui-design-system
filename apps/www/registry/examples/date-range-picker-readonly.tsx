"use client"

import { CalendarDate } from "@internationalized/date"
import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerReadOnly() {
  return (
    <DateRangePicker
      label="Event date"
      value={{
        start: new CalendarDate(2024, 7, 1),
        end: new CalendarDate(2024, 7, 8),
      }}
      isReadOnly
    />
  )
}
