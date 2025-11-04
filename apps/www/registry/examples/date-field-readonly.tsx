"use client"

import { CalendarDate } from "@internationalized/date"

import { DateField } from "@opengovsg/oui"

export default function DateFieldReadonly() {
  return (
    <DateField
      isReadOnly
      label="Birth date"
      defaultValue={new CalendarDate(2019, 7, 27)}
    />
  )
}
