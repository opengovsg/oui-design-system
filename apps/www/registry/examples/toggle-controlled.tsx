"use client"

import { Toggle } from "@opengovsg/oui"
import { useState } from "react"

export default function ToggleControlled() {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Toggle isSelected={isSelected} onChange={setIsSelected}>
        Dark mode
      </Toggle>
      <p className="text-base-content-medium text-sm">
        Dark mode is {isSelected ? "on" : "off"}.
      </p>
    </div>
  )
}
