"use client"

import { Time } from "@internationalized/date"
import { TimeField } from "@opengovsg/oui"

export default function TimeFieldDisabled() {
  return (
    <TimeField
      isDisabled
      label="Event time"
      placeholderValue={new Time(9, 0)}
    />
  )
}
