"use client"

import { Radio, RadioGroup } from "@opengovsg/oui"

export default function RadioGroupCustomStyles() {
  return (
    <RadioGroup
      label="Select a plan"
      defaultValue="basic"
      classNames={{
        base: "gap-4",
      }}
    >
      <Radio
        value="basic"
        description="For personal use"
        classNames={{
          base: "border rounded-lg border-gray-200 p-4 data-[selected]:border-interaction-main-default",
        }}
      >
        Basic
      </Radio>
      <Radio
        value="pro"
        description="For teams and businesses"
        classNames={{
          base: "border rounded-lg border-gray-200 p-4 data-[selected]:border-interaction-main-default",
        }}
      >
        Pro
      </Radio>
    </RadioGroup>
  )
}
