"use client"

import { useState } from "react"
import { Time } from "@internationalized/date"

import { TimeField } from "@opengovsg/oui"

export default function TimeFieldControlled() {
  const [value, setValue] = useState<Time | null>(new Time(11, 45))

  return (
    <div className="flex w-full flex-col gap-y-2">
      <TimeField
        label="Event time (controlled)"
        value={value}
        onChange={setValue}
      />
      <p className="text-default-500 text-sm">
        Selected time: {value ? value.toString() : "--"}
      </p>
    </div>
  )
}
