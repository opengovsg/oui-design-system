"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"

import { TagField } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

export default function TagFieldCustomChildren() {
  const options = [
    { id: 1, textValue: "Aerospace", description: "Aerospace engineering" },
    { id: 2, textValue: "Mechanical", description: "Mechanical engineering" },
    { id: 3, textValue: "Civil", description: "Civil engineering" },
    { id: 4, textValue: "Biomedical", description: "Biomedical engineering" },
    { id: 5, textValue: "Nuclear", description: "Nuclear engineering" },
    { id: 6, textValue: "Industrial", description: "Industrial engineering" },
    { id: 7, textValue: "Chemical", description: "Chemical engineering" },
    { id: 8, textValue: "Electrical", description: "Electrical engineering" },
  ]

  const [selectedIds, setSelectedIds] = useState<Set<Key>>(new Set())

  return (
    <div className="flex flex-col">
      <TagField
        label="Engineering"
        defaultItems={options}
        selectedKeys={selectedIds}
        onSelectionChange={setSelectedIds}
        virtualRowHeight={64} // Important if you have custom children
      >
        {({ itemProps, key, item, isHighlighted, classNames }) => (
          <div
            key={key}
            {...itemProps}
            className={cn(
              classNames?.container,
              "flex flex-col p-2",
              isHighlighted && "bg-amber-100",
            )}
          >
            <span className={cn(classNames?.label)}>{item.textValue}</span>
            <span className={cn(classNames?.description, "text-gray-600")}>
              {item.description}
            </span>
          </div>
        )}
      </TagField>
      <p>Selected types: {[...selectedIds].join(", ")}</p>
    </div>
  )
}
