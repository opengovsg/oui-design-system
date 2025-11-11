"use client"

import { useState } from "react"

import { NumberField } from "@opengovsg/oui"

export default function NumberFieldControlled() {
  const [value, setValue] = useState(25)

  return (
    <div className="flex flex-col gap-4">
      <NumberField
        label="Controlled Number Field"
        value={value}
        onChange={setValue}
      />
      <p className="text-sm text-gray-600">Current value: {value}</p>
    </div>
  )
}
