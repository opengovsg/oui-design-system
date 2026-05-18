"use client"

import { TagField } from "@opengovsg/oui"

export default function TagFieldCustomStyles() {
  const options = [
    { id: 1, textValue: "Aerospace" },
    { id: 2, textValue: "Mechanical" },
    { id: 3, textValue: "Civil" },
    { id: 4, textValue: "Biomedical" },
    { id: 5, textValue: "Nuclear" },
    { id: 6, textValue: "Industrial" },
  ]

  return (
    <TagField
      label="Engineering"
      defaultItems={options}
      classNames={{
        label: "text-purple-600 font-semibold",
        group: "border-2 border-purple-400 focus-within:border-purple-600",
        tag: "bg-purple-100 text-purple-700",
      }}
    />
  )
}
