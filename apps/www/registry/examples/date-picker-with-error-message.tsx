"use client"

import { DatePicker } from "@opengovsg/oui"

export default function DatePickerWithErrorMessage() {
  return (
    <DatePicker
      label="Birth date"
      isInvalid
      errorMessage="Please enter a valid date"
    />
  )
}
