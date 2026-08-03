"use client"

import { Toggle } from "@opengovsg/oui"
import { Check, X } from "lucide-react"

export default function ToggleWithThumbIcon() {
  return (
    <Toggle
      aria-label="Toggle"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Check className={className} />
        ) : (
          <X className={className} />
        )
      }
    />
  )
}
