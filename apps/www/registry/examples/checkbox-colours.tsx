"use client"

import { Checkbox } from "@opengovsg/oui"

export default function CheckboxColours() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected color="default">
        Default
      </Checkbox>
    </div>
  )
}
