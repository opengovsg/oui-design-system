"use client"

import { ComboBox, ComboBoxItem } from "@opengovsg/oui"

export default function ComboBoxSizes() {
  return (
    <div className="flex flex-col gap-6">
      <ComboBox size="xs" label="Extra Small">
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
      </ComboBox>
      <ComboBox size="sm" label="Small">
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
      </ComboBox>
      <ComboBox size="md" label="Medium (default)">
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
      </ComboBox>
    </div>
  )
}
