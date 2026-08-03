"use client"

import { FieldError, Input, Label } from "@opengovsg/oui"
import { TextField as AriaTextField } from "react-aria-components"

export default function FieldErrorExample() {
  return (
    <AriaTextField isInvalid className="flex flex-col gap-2">
      <Label>Email address</Label>
      <Input placeholder="Enter email" />
      <FieldError>Please enter a valid email address.</FieldError>
    </AriaTextField>
  )
}
