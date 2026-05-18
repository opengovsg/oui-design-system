"use client"

import { ComboBox, ComboBoxItem } from "@opengovsg/oui"

export default function ComboBoxCustomStyles() {
  return (
    <ComboBox
      label="Favourite animal"
      classNames={{
        label: "text-purple-600 font-semibold",
        group: "border-purple-400 focus-within:border-purple-600",
      }}
    >
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
    </ComboBox>
  )
}
