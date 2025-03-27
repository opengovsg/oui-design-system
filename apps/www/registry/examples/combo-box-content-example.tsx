"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"

import { ComboBox, ComboBoxItem } from "@opengovsg/oui"

export default function ComboBoxContentExample() {
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
    <div className="flex flex-col">
      <ComboBox
        label="Engineering"
        defaultItems={options}
        selectedKey={selectedId}
        onSelectionChange={setSelectedId}
      >
        {(item) => <ComboBoxItem>{item.textValue}</ComboBoxItem>}
      </ComboBox>
      <p>Selected id: {selectedId ?? "None"}</p>
    </div>
  )
}
