"use client"

import { Checkbox } from "@opengovsg/oui"

export default function CheckboxDisabled() {
  return (
    <div className="flex gap-4">
      <Checkbox isDisabled>Option</Checkbox>
      <Checkbox defaultSelected isDisabled>
        Option
      </Checkbox>
    </div>
  )
}
