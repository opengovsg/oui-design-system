"use client"

import { Select, SelectItem } from "@opengovsg/oui"
import { useState } from "react"
import type { Key } from "react-aria-components"

export default function SelectContentExample() {
  const options = [
    { id: 1, textValue: "Aerospace" },
    { id: 2, textValue: "Mechanical" },
    { id: 3, textValue: "Civil" },
    { id: 4, textValue: "Biomedical" },
    { id: 5, textValue: "Nuclear" },
    { id: 6, textValue: "Industrial" },
    { id: 7, textValue: "Chemical" },
    { id: 8, textValue: "Agricultural" },
    { id: 9, textValue: "Electrical" },
  ]

  const [selectedId, setSelectedId] = useState<Key | null>(null)

  return (
    <div className="flex w-full max-w-xs flex-col">
      <Select
        label="Engineering"
        items={options}
        selectedKey={selectedId}
        onSelectionChange={setSelectedId}
      >
        {(item) => <SelectItem>{item.textValue}</SelectItem>}
      </Select>
      <p>Selected id: {selectedId ?? "None"}</p>
    </div>
  )
}
