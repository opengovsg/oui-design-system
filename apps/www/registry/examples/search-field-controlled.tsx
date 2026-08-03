"use client"

import { SearchField } from "@opengovsg/oui"
import { useState } from "react"

export default function SearchFieldControlled() {
  const [value, setValue] = useState("")
  const [submittedValue, setSubmittedValue] = useState<string | null>(null)

  return (
    <div className="flex w-full flex-col gap-y-2">
      <SearchField
        label="Controlled search"
        value={value}
        onChange={setValue}
        onSubmit={() => setSubmittedValue(value)}
      />
      <p className="text-base-content-medium text-sm">
        Input value: <strong>{value || "–"}</strong>
      </p>
      <p className="text-base-content-medium text-sm">
        Submitted value: <strong>{submittedValue ?? "–"}</strong>
      </p>
    </div>
  )
}
