"use client"

import { Radio, RadioGroup } from "@opengovsg/oui"

export default function RadioGroupSizes() {
  return (
    <div className="flex flex-col gap-8">
      <RadioGroup label="Extra small (xs)" size="xs" defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>

      <RadioGroup label="Small (sm)" size="sm" defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>

      <RadioGroup label="Medium (md)" size="md" defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>
    </div>
  )
}
