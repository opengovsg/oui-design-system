"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"

import { Select, SelectItem } from "@opengovsg/oui"

const animals = [
  { id: "cat", label: "Cat" },
  { id: "dog", label: "Dog" },
  { id: "rabbit", label: "Rabbit" },
  { id: "hamster", label: "Hamster" },
]

export default function SelectControlled() {
  const [value, setValue] = useState<Key | null>(null)

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Favourite animal"
        value={value}
        onChange={setValue}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.id} id={animal.id}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-sm">Selected: {value ?? "None"}</p>
    </div>
  )
}
