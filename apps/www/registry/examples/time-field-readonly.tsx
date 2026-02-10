"use client"

import { Time } from "@internationalized/date"

import { TimeField } from "@opengovsg/oui"

export default function TimeFieldReadonly() {
  return (
    <TimeField isReadOnly label="Event time" defaultValue={new Time(9, 30)} />
  )
}
