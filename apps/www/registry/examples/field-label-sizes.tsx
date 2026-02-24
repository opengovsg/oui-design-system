"use client"

import { TextField as AriaTextField } from "react-aria-components"

import { Description, Input, Label } from "@opengovsg/oui"

export default function FieldLabelSizes() {
  return (
    <div className="flex flex-col gap-6">
      <AriaTextField className="flex flex-col gap-2">
        <Label size="xs">Extra small label</Label>
        <Input size="xs" placeholder="Extra small" />
        <Description size="xs">Extra small description</Description>
      </AriaTextField>
      <AriaTextField className="flex flex-col gap-2">
        <Label size="sm">Small label</Label>
        <Input size="sm" placeholder="Small" />
        <Description size="sm">Small description</Description>
      </AriaTextField>
      <AriaTextField className="flex flex-col gap-2">
        <Label size="md">Medium label (default)</Label>
        <Input size="md" placeholder="Medium" />
        <Description size="md">Medium description</Description>
      </AriaTextField>
    </div>
  )
}
