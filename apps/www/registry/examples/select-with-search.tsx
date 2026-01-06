"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"
import { SearchIcon } from "lucide-react"

import { Select, SelectItem } from "@opengovsg/oui"

export default function SelectWithSearch() {
  const countries = [
    { id: 1, name: "Singapore" },
    { id: 2, name: "Malaysia" },
    { id: 3, name: "Indonesia" },
    { id: 4, name: "Thailand" },
    { id: 5, name: "Philippines" },
    { id: 6, name: "Vietnam" },
    { id: 7, name: "Myanmar" },
    { id: 8, name: "Cambodia" },
    { id: 9, name: "Laos" },
    { id: 10, name: "Brunei" },
    { id: 11, name: "East Timor" },
  ]

  const [selectedId, setSelectedId] = useState<Key | null>(null)

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Select a country"
        items={countries}
        value={selectedId}
        onChange={setSelectedId}
        enableSearch
      >
        {(item) => <SelectItem>{item.name}</SelectItem>}
      </Select>
      <p className="text-content-medium text-sm">
        Selected: {countries.find((c) => c.id === selectedId)?.name ?? "None"}
      </p>
    </div>
  )
}
