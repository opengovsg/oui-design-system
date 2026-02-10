"use client"

import { TimeField } from "@opengovsg/oui"

export default function TimeFieldWithErrorMessage() {
  return (
    <TimeField
      label="Event time"
      isInvalid
      errorMessage="Please enter a valid time"
    />
  )
}
