"use client"

import { Select, SelectItem } from "@opengovsg/oui"

export default function SelectDemo() {
  return (
    <Select label="Favourite animal">
      <SelectItem>Aardvark</SelectItem>
      <SelectItem>Cat</SelectItem>
      <SelectItem>Dog</SelectItem>
      <SelectItem>Kangaroo</SelectItem>
      <SelectItem>Panda</SelectItem>
      <SelectItem>Snake</SelectItem>
    </Select>
  )
}
