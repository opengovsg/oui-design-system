"use client"

import { Checkbox, CheckboxGroup } from "@opengovsg/oui"
import { useState } from "react"

export default function CheckboxGroupDisabled() {
  const [isInvalid, setIsInvalid] = useState(true)

  return (
    <CheckboxGroup
      isRequired
      description="Select the cities you want to visit"
      isInvalid={isInvalid}
      label="Select cities"
      onChange={(value) => {
        setIsInvalid(value.length < 1)
      }}
    >
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
  )
}
