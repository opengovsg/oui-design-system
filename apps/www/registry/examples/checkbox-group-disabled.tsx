"use client"

import { Checkbox, CheckboxGroup } from "@opengovsg/oui"

export default function CheckboxGroupDisabled() {
  return (
    <CheckboxGroup
      isDisabled
      defaultValue={["buenos-aires", "london"]}
      label="Select cities"
    >
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
  )
}
