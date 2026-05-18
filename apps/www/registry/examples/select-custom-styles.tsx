"use client"

import { Select, SelectItem } from "@opengovsg/oui"

export default function SelectCustomStyles() {
  return (
    <div className="w-full max-w-xs">
      <Select
        label="Favourite animal"
        placeholder="Pick one"
        classNames={{
          trigger: "border-2 border-blue-500 rounded-lg",
          list: "bg-blue-50",
        }}
      >
        <SelectItem>Aardvark</SelectItem>
        <SelectItem>Cat</SelectItem>
        <SelectItem>Dog</SelectItem>
        <SelectItem>Kangaroo</SelectItem>
      </Select>
    </div>
  )
}
