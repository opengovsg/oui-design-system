"use client"

import { Time } from "@internationalized/date"
import { TimeField } from "@opengovsg/oui"

export default function TimeFieldWithDescription() {
  return (
    <TimeField
      label="Event time"
      placeholderValue={new Time(9, 0)}
      description="Please enter the event start time."
    />
  )
}
