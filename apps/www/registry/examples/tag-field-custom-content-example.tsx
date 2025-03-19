"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"

import { TagField } from "@opengovsg/oui"

export default function TagFieldCustomContentExample() {
  const options = [
    { email: "test1@example.com", name: "Test Example 1" },
    { email: "test2@example.com", name: "Test Example 2" },
    { email: "test3@example.com", name: "Test Example 3" },
    { email: "test4@example.com", name: "Test Example 4" },
    { email: "test5@example.com", name: "Test Example 5" },
  ]

  const [selectedIds, setSelectedIds] = useState<Set<Key>>(new Set())

  return (
    <div className="flex flex-col">
      <TagField
        label="Users to notify"
        defaultItems={options}
        selectedKeys={selectedIds}
        onSelectionChange={setSelectedIds}
        itemToKey={(item) => item.email}
        itemToText={(item) => item.name}
      />
      <p>Selected emails: {[...selectedIds].join(", ")}</p>
    </div>
  )
}
