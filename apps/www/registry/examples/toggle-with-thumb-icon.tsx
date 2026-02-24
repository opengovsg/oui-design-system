"use client"

import { Check, X } from "lucide-react"

import { Toggle } from "@opengovsg/oui"

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
