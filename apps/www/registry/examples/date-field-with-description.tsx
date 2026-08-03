"use client"

import { CalendarDate } from "@internationalized/date"
import { DateField } from "@opengovsg/oui"

export default function DateFieldWithDescription() {
  return (
    <DateField
      label="Birth date"
      placeholderValue={new CalendarDate(2019, 7, 27)}
      description="Please enter your birth date."
    />
  )
}
