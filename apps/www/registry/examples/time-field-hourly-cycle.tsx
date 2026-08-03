"use client"

import { Time } from "@internationalized/date"
import { TimeField } from "@opengovsg/oui"

export default function TimeFieldHourlyCycle() {
  return (
    <TimeField
      defaultValue={new Time(15, 30)}
      hourCycle={24}
      label="Appointment time"
    />
  )
}
