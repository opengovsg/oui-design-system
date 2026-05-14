"use client"

import { useState } from "react"

import { Button, TextField } from "@opengovsg/oui"
import { Form } from "react-aria-components"

export default function FormsMinimalEndToEnd() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <Form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))
        setSubmitted(JSON.stringify(data, null, 2))
      }}
    >
      <TextField name="fullName" label="Full name" isRequired />
      <Button type="submit">Submit</Button>
      {submitted && (
        <pre className="rounded bg-gray-100 p-3 text-sm">{submitted}</pre>
      )}
    </Form>
  )
}
