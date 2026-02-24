"use client"

import { useState } from "react"

import { Toggle } from "@opengovsg/oui"

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
