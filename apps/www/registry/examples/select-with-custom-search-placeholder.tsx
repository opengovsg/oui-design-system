"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"

import { Select, SelectItem } from "@opengovsg/oui"

export default function SelectWithCustomSearchPlaceholder() {
  const fruits = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
    { id: 4, name: "Durian" },
    { id: 5, name: "Elderberry" },
    { id: 6, name: "Fig" },
    { id: 7, name: "Grape" },
    { id: 8, name: "Honeydew" },
    { id: 9, name: "Kiwi" },
    { id: 10, name: "Lemon" },
  ]

  const [selectedId, setSelectedId] = useState<Key | null>(null)

  return (
    <div className="flex w-full max-w-xs">
      <Select
        label="Select a fruit"
        items={fruits}
        value={selectedId}
        onChange={setSelectedId}
        enableSearch
        searchPlaceholder="Type to filter fruits..."
      >
        {(item) => <SelectItem>{item.name}</SelectItem>}
      </Select>
    </div>
  )
}
