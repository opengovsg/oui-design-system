"use client"

import { Select, SelectItem } from "@opengovsg/oui"

export default function SelectDescription() {
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

  return (
    <Select
      label="Engineering"
      items={options}
      description="Choose one of the above options."
    >
      {(item) => <SelectItem>{item.textValue}</SelectItem>}
    </Select>
  )
}
