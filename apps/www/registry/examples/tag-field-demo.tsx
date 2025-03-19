"use client"

import { TagField } from "@opengovsg/oui"

export default function TagFieldDemo() {
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

  return <TagField label="Engineering" defaultItems={options} />
}
