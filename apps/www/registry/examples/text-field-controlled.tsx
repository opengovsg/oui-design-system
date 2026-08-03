"use client"

import { TextField } from "@opengovsg/oui"
import { useState } from "react"

export default function TextFieldControlled() {
  const [value, setValue] = useState("")

  return (
    <div className="flex flex-col gap-2">
      <TextField
        label="Your name"
        value={value}
        onChange={setValue}
        inputProps={{ placeholder: "Type here" }}
      />
      <p className="text-base-content-medium text-sm">
        Current value: {value || "(empty)"}
      </p>
    </div>
  )
}
