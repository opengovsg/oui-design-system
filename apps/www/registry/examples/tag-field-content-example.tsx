"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"

import { TagField } from "@opengovsg/oui"

export default function TagFieldContentExample() {
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

  const [selectedIds, setSelectedIds] = useState<Set<Key>>(new Set())

  return (
    <div className="flex flex-col">
      <TagField
        label="Engineering"
        defaultItems={options}
        selectedKeys={selectedIds}
        onSelectionChange={setSelectedIds}
      />
      <p>Selected ids: {[...selectedIds].join(", ")}</p>
    </div>
  )
}
