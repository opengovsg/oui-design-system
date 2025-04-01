"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"

import { Select, SelectItem } from "@opengovsg/oui"

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
    <Select
      description="The second most popular pet in the world"
      errorMessage={isValid ? "" : "You must select a cat"}
      isInvalid={!isValid}
      label="Favorite Animal"
      placeholder="Select an animal"
      selectedKey={value}
      onSelectionChange={setValue}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.id} id={animal.id}>
          {animal.textValue}
        </SelectItem>
      ))}
    </Select>
  )
}
