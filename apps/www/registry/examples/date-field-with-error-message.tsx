"use client"

import { DateField } from "@opengovsg/oui"

export default function DateFieldInvalid() {
  return (
    <DateField
      label="Birth date"
      isInvalid
      errorMessage="Please enter a valid date"
    />
  )
}
