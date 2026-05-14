"use client"

import { useState } from "react"

import { Button, TextField } from "@opengovsg/oui"
import { Form } from "react-aria-components"

export default function FormsControlledSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <Form
      className="flex flex-col gap-6"
      onSubmit={async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 1200))
        setIsSubmitting(false)
      }}
    >
      <TextField name="message" label="Message" isRequired />
      <Button type="submit" isDisabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit"}
      </Button>
    </Form>
  )
}
