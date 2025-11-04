"use client"

import { CalendarDateTime } from "@internationalized/date"

import { DatePicker } from "@opengovsg/oui"

export default function DatePickerWithTimeFields() {
  return (
    <DatePicker
      label="Event date"
      placeholderValue={new CalendarDateTime(2019, 7, 27, 12, 30)}
    />
  )
}
