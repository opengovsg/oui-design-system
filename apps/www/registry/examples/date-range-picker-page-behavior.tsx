"use client"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerPageBehavior() {
  return (
    <DateRangePicker
      label="Event date"
      calendarProps={{
        visibleDuration: { months: 2 },
        pageBehavior: "visible",
      }}
    />
  )
}
