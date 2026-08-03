"use client"

import { CalendarDate } from "@internationalized/date"
import { DatePicker } from "@opengovsg/oui"

export default function DatePickerReadonly() {
  return (
    <DatePicker
      isReadOnly
      label="Birth date"
      defaultValue={new CalendarDate(2019, 7, 27)}
    />
  )
}
