"use client"

import { isPossiblePhoneNumber, PhoneNumberField } from "@opengovsg/oui"
import { useState } from "react"

export default function PhoneNumberFieldWithValidation() {
  const [errorMessage, setErrorMessage] = useState<string>()

  return (
    <PhoneNumberField
      label="Contact number"
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
      onChange={(value) => {
        if (value && !isPossiblePhoneNumber(value)) {
          setErrorMessage("Please enter a valid contact number.")
        } else {
          setErrorMessage(undefined)
        }
      }}
    />
  )
}
