"use client"

import { useState } from "react"

import type { E164Number } from "@opengovsg/oui"
import { formatPhoneNumberIntl, PhoneNumberField } from "@opengovsg/oui"

export default function PhoneNumberFieldControlled() {
  const [value, setValue] = useState<E164Number | undefined>()

  return (
    <div className="flex flex-col gap-4">
      <PhoneNumberField
        label="Contact number"
        value={value}
        onChange={setValue}
      />
      <p className="text-sm text-gray-600">
        Value: {value ? formatPhoneNumberIntl(value) : "empty"}
      </p>
    </div>
  )
}
