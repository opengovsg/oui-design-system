"use client"

import { useState } from "react"
import { Form } from "react-aria-components"

import { Button, TextField } from "@opengovsg/oui"

export default function FormsServerErrors() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <Form
      className="flex flex-col gap-6"
      validationBehavior="aria"
      onSubmit={async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setServerError(null)
        await new Promise((r) => setTimeout(r, 500))
        // Simulated server error
        setServerError("This username is already taken")
        setIsSubmitting(false)
      }}
    >
      <TextField
        name="username"
        label="Username"
        isRequired
        isInvalid={serverError != null}
        errorMessage={serverError ?? undefined}
      />
      <Button type="submit" isDisabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  )
}
