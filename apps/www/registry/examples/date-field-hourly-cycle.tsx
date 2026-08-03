"use client"

import { parseZonedDateTime } from "@internationalized/date"
import { DateField } from "@opengovsg/oui"

export default function DateFieldHourlyCycle() {
  return (
    <DateField
      defaultValue={parseZonedDateTime("2025-11-04T15:55[Asia/Singapore]")}
      granularity="minute"
      hourCycle={24}
      label="Appointment time"
    />
  )
}
