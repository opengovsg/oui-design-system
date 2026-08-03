"use client"

import { CalendarDate } from "@internationalized/date"
import { DatePicker } from "@opengovsg/oui"
import { CalendarDays } from "lucide-react"

export default function DatePickerWithSelectorIcon() {
  return (
    <DatePicker
      label="Birth date"
      placeholderValue={new CalendarDate(2019, 7, 27)}
      selectorIcon={<CalendarDays />}
    />
  )
}
