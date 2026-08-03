"use client"

import { Time } from "@internationalized/date"
import { TimeField } from "@opengovsg/oui"

export default function TimeFieldSizes() {
  return (
    <div className="flex w-full flex-col gap-4">
      <TimeField
        size="xs"
        defaultValue={new Time(9, 30)}
        label="Event time (xs)"
      />
      <TimeField
        size="sm"
        defaultValue={new Time(9, 30)}
        label="Event time (sm)"
      />
      <TimeField
        size="md"
        defaultValue={new Time(9, 30)}
        label="Event time (md)"
      />
    </div>
  )
}
