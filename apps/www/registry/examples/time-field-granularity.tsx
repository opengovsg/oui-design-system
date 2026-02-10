"use client"

import { Time } from "@internationalized/date"

import { TimeField } from "@opengovsg/oui"

export default function TimeFieldGranularity() {
  return (
    <div className="flex w-full flex-col gap-4">
      <TimeField
        defaultValue={new Time(9, 30)}
        granularity="hour"
        label="Hour only"
      />
      <TimeField
        defaultValue={new Time(9, 30)}
        granularity="minute"
        label="Hour and minute"
      />
      <TimeField
        defaultValue={new Time(9, 30, 15)}
        granularity="second"
        label="Hour, minute, and second"
      />
    </div>
  )
}
