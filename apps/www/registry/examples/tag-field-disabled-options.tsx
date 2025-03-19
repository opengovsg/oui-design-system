"use client"

import { TagField } from "@opengovsg/oui"

export default function TagFieldDisabled() {
  const options = [
    { id: "red panda", textValue: "Panda" },
    { id: "cat", textValue: "Cat" },
    { id: "dog", textValue: "Dog" },
    { id: "aardvark", textValue: "Aardvark" },
    { id: "kangaroo", textValue: "Kangaroo" },
    { id: "snake", textValue: "Snake" },
  ]

  return (
    <TagField
      label="Favorite Animal"
      defaultItems={options}
      disabledKeys={["cat", "kangaroo"]}
    />
  )
}
