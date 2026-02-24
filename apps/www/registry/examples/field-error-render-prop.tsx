"use client"

import { Form, TextField as AriaTextField } from "react-aria-components"

import { Button, FieldError, FieldErrorIcon, Input, Label } from "@opengovsg/oui"

export default function FieldErrorRenderProp() {
  return (
    <Form className="flex flex-col gap-4">
      <AriaTextField name="email" type="email" isRequired className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
        <FieldError>
          {({ validationDetails }) => (
            <>
              <FieldErrorIcon />
              {validationDetails.valueMissing
                ? "Please enter an email address."
                : "Please enter a valid email address."}
            </>
          )}
        </FieldError>
      </AriaTextField>
      <Button type="submit" className="w-fit">
        Submit
      </Button>
    </Form>
  )
}
