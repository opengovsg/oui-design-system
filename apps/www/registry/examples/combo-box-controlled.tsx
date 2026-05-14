"use client"

import type { Key } from "react-aria-components"
import { useState } from "react"

import { ComboBox, ComboBoxItem } from "@opengovsg/oui"

const animals = [
  { id: "1", textValue: "Aardvark" },
  { id: "2", textValue: "Cat" },
  { id: "3", textValue: "Dog" },
  { id: "4", textValue: "Kangaroo" },
  { id: "5", textValue: "Panda" },
  { id: "6", textValue: "Snake" },
]

export default function ComboBoxControlled() {
  const [inputValue, setInputValue] = useState("")
  const [selectedKey, setSelectedKey] = useState<Key | null>(null)

  return (
    <div className="flex flex-col gap-2">
      <ComboBox
        label="Favourite animal"
        items={animals}
        inputValue={inputValue}
        onInputChange={setInputValue}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        {(item) => <ComboBoxItem id={item.id}>{item.textValue}</ComboBoxItem>}
      </ComboBox>
      <p className="text-sm">
        Selected key: <code>{selectedKey ?? "none"}</code>
      </p>
      <p className="text-sm">
        Input value: <code>{inputValue || "(empty)"}</code>
      </p>
    </div>
  )
}
