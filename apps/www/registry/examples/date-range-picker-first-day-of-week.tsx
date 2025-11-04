"use client"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerFirstDayOfWeek() {
  return (
    <DateRangePicker
      label="Event date"
      calendarProps={{ firstDayOfWeek: "mon" }}
    />
  )
}
