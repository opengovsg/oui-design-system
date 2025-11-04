"use client"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerWithErrorMessage() {
  return (
    <DateRangePicker
      label="Event date"
      isInvalid
      errorMessage="Please enter a valid date range."
    />
  )
}
