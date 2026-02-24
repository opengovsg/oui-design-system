"use client"

import { TextField as AriaTextField } from "react-aria-components"

import { Description, FieldError, Input, Label } from "@opengovsg/oui"

export default function FieldDemo() {
  return (
    <AriaTextField className="flex flex-col gap-2">
      <Label>Full name</Label>
      <Input placeholder="Enter your full name" />
      <Description>As shown on your NRIC or FIN.</Description>
      <FieldError />
    </AriaTextField>
  )
}
