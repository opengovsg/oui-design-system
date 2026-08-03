"use client"

import { Select, SelectItem } from "@opengovsg/oui"
import { useState } from "react"
import type { Key } from "react-aria-components"

export const animals = [
  { id: "cat", textValue: "Cat" },
  { id: "dog", textValue: "Dog" },
  { id: "elephant", textValue: "Elephant" },
  { id: "lion", textValue: "Lion" },
  { id: "tiger", textValue: "Tiger" },
  { id: "giraffe", textValue: "Giraffe" },
  { id: "dolphin", textValue: "Dolphin" },
  { id: "penguin", textValue: "Penguin" },
  { id: "zebra", textValue: "Zebra" },
  { id: "shark", textValue: "Shark" },
  { id: "whale", textValue: "Whale" },
  { id: "otter", textValue: "Otter" },
  { id: "crocodile", textValue: "Crocodile" },
]

export default function App() {
  const [value, setValue] = useState<Key | null>(null)
  const isValid = value === "cat"

  return (
    <div className="w-full max-w-xs">
      <Select
        description="The second most popular pet in the world"
        errorMessage={isValid ? "" : "You must select a cat"}
        isInvalid={!isValid}
        label="Favorite Animal"
        placeholder="Select an animal"
        value={value}
        onChange={setValue}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.id} id={animal.id}>
            {animal.textValue}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
