"use client"

import { CalendarDate } from "@internationalized/date"

import { DatePicker } from "@opengovsg/oui"

export default function DatePickerDemo() {
  return (
    <DatePicker
      label="Birth date"
      placeholderValue={new CalendarDate(2019, 7, 27)}
    />
  )
}
