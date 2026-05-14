"use client"

import { useState } from "react"

import { Button, TextField } from "@opengovsg/oui"
import { Form } from "react-aria-components"

export default function FormsValidationRealtime() {
  const [value, setValue] = useState("")
  const isValid = value.length >= 8

  return (
    <Form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <TextField
        name="password"
        label="Password"
        type="password"
        value={value}
        onChange={setValue}
        isInvalid={value.length > 0 && !isValid}
        errorMessage="Password must be at least 8 characters"
      />
      <Button type="submit" isDisabled={!isValid}>
        Submit
      </Button>
    </Form>
  )
}
