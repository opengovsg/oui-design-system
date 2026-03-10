"use client"

import { Radio, RadioGroup } from "@opengovsg/oui"

export default function RadioGroupDisabled() {
  return (
    <div className="flex flex-col gap-8">
      <RadioGroup label="Disabled group" isDisabled defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>

      <RadioGroup label="Disabled individual items" defaultValue="a">
        <Radio value="a" isDisabled>
          Disabled selected
        </Radio>
        <Radio value="b" isDisabled>
          Disabled unselected
        </Radio>
        <Radio value="c">Enabled</Radio>
      </RadioGroup>
    </div>
  )
}
