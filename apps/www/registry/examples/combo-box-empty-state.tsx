"use client"

import { ComboBox, ComboBoxEmptyState, ComboBoxItem } from "@opengovsg/oui"

export default function ComboBoxEmptyStateExample() {
  return (
    <ComboBox
      label="Favourite animal"
      renderEmptyState={() => <ComboBoxEmptyState className="text-red-500" />}
    >
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
    </ComboBox>
  )
}
