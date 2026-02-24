"use client"

import { useState } from "react"

import { TextAreaField } from "@opengovsg/oui"

export default function TextAreaFieldControlled() {
  const [value, setValue] = useState("")

  return (
    <div className="flex flex-col gap-2">
      <TextAreaField
        label="Bio"
        value={value}
        onChange={setValue}
        inputProps={{ placeholder: "Tell us about yourself" }}
      />
      <p className="text-base-content-medium text-sm">
        {value.length} characters
      </p>
    </div>
  )
}
