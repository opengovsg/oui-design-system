"use client"

import { Button, TextField } from "@opengovsg/oui"
import { Form } from "react-aria-components"

export default function FormsValidationCustom() {
  return (
    <Form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <TextField
        name="username"
        label="Username"
        isRequired
        validate={(v) =>
          v.includes(" ") ? "Username cannot contain spaces" : null
        }
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
