"use client"

import { ComboBox, ComboBoxItem } from "@opengovsg/oui"

export default function ComboBoxValidation() {
  return (
    <div className="flex flex-col gap-6">
      <ComboBox label="Required field" isRequired>
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
      </ComboBox>
      <ComboBox
        label="Realtime invalid"
        isInvalid
        errorMessage="Please select a valid option"
      >
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
      </ComboBox>
    </div>
  )
}
