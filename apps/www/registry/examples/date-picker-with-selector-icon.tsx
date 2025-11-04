"use client"

import { CalendarDate } from "@internationalized/date"
import { CalendarDays } from "lucide-react"

import { DatePicker } from "@opengovsg/oui"

export default function DatePickerWithSelectorIcon() {
  return (
    <DatePicker
      label="Birth date"
      placeholderValue={new CalendarDate(2019, 7, 27)}
      selectorIcon={<CalendarDays />}
    />
  )
}
