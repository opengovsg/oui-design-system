"use client"

import { Radio, RadioGroup } from "@opengovsg/oui"

export default function RadioGroupInvalid() {
  return (
    <RadioGroup
      label="Select an option"
      isRequired
      isInvalid
      errorMessage="Please select an option."
    >
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}
