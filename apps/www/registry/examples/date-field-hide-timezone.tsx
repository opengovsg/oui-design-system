"use client"

import { parseZonedDateTime } from "@internationalized/date"
import { DateField } from "@opengovsg/oui"

export default function DateFieldDemo() {
  return (
    <DateField
      hideTimeZone
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
      label="Appointment time"
    />
  )
}
