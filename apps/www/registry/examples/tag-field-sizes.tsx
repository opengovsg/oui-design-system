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
    <div className="flex flex-col space-y-4">
      <TagField
        label="Favorite Animal (xs)"
        defaultItems={options}
        size="xs"
        defaultSelectedKeys={new Set(["cat"])}
      />
      <TagField
        label="Favorite Animal (sm)"
        defaultItems={options}
        size="sm"
        defaultSelectedKeys={new Set(["dog"])}
      />
      <TagField
        label="Favorite Animal (md)"
        defaultItems={options}
        size="md"
        defaultSelectedKeys={new Set(["aardvark"])}
      />
    </div>
  )
}
