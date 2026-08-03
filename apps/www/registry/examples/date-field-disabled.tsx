"use client"

import { CalendarDate } from "@internationalized/date"
import { DateField } from "@opengovsg/oui"

export default function DateFieldDisabled() {
  return (
    <DateField
      isDisabled
      label="Birth date"
      placeholderValue={new CalendarDate(2019, 7, 27)}
    />
  )
}
