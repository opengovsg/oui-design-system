"use client"

import { ComboBox, ComboBoxItem } from "@opengovsg/oui"

export default function ComboBoxDemo() {
  return (
    <ComboBox label="Favourite animal">
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem>Snake</ComboBoxItem>
    </ComboBox>
  )
}
