"use client"

import { CalendarDate } from "@internationalized/date"
import { DatePicker } from "@opengovsg/oui"

export default function DatePickerFirstDayOfWeek() {
  return (
    <DatePicker
      label="Event date"
      placeholderValue={new CalendarDate(2019, 7, 27)}
      firstDayOfWeek="mon"
    />
  )
}
