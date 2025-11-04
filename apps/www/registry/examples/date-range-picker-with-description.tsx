"use client"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerWithDescription() {
  return (
    <DateRangePicker
      label="Event date"
      description="Select the start and end dates for your event."
    />
  )
}
