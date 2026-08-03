"use client"

import { Description, FieldError, FieldGroup, Label } from "@opengovsg/oui"
import { Search } from "lucide-react"
import { Input, TextField } from "react-aria-components"

export default function FormsFieldPrimitives() {
  return (
    <TextField className="flex flex-col gap-2" isRequired>
      <Label>Search</Label>
      <FieldGroup>
        <Search className="ml-3 size-4 text-gray-500" aria-hidden />
        <Input
          className="flex-1 bg-transparent px-2 py-1 outline-none"
          placeholder="Type to search…"
        />
      </FieldGroup>
      <Description>
        Use Field primitives when you need an adornment.
      </Description>
      <FieldError />
    </TextField>
  )
}
