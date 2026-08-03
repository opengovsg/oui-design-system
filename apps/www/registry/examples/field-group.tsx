"use client"

import { FieldGroup, Input, Label } from "@opengovsg/oui"
import { Search } from "lucide-react"
import { TextField as AriaTextField } from "react-aria-components"

export default function FieldGroupExample() {
  return (
    <AriaTextField className="flex flex-col gap-2">
      <Label>Search</Label>
      <FieldGroup>
        <Search className="text-base-content-medium ml-3 h-4 w-4 shrink-0" />
        <Input variant="unstyled" placeholder="Search for something" />
      </FieldGroup>
    </AriaTextField>
  )
}
