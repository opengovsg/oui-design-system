"use client"

import { Checkbox } from "@opengovsg/oui"

export default function CheckboxSizes() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected size="xs">
        Extra Small (xs)
      </Checkbox>
      <Checkbox defaultSelected size="sm">
        Small (sm)
      </Checkbox>
      <Checkbox defaultSelected size="md">
        Medium (md)
      </Checkbox>
    </div>
  )
}
