"use client"

import { Radio, RadioGroup } from "@opengovsg/oui"

export default function RadioGroupDemo() {
  return (
    <RadioGroup label="Select a city" defaultValue="sf">
      <Radio value="sf">San Francisco</Radio>
      <Radio value="ny">New York</Radio>
      <Radio value="tokyo">Tokyo</Radio>
      <Radio value="london">London</Radio>
    </RadioGroup>
  )
}
