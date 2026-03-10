"use client"

import { TextField as AriaTextField, Form } from "react-aria-components"

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from "@opengovsg/oui"

export default function FieldCustomForm() {
  return (
    <Form className="flex flex-col gap-6">
      <AriaTextField isRequired className="flex flex-col gap-2">
        <Label>Username</Label>
        <FieldGroup>
          <span className="text-base-content-medium ml-3 text-sm">@</span>
          <Input variant="unstyled" placeholder="Enter username" />
        </FieldGroup>
        <Description>This will be your public display name.</Description>
        <FieldError />
      </AriaTextField>
      <AriaTextField isRequired className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input type="email" placeholder="you@example.com" />
        <FieldError />
      </AriaTextField>
      <Button type="submit" className="w-fit">
        Submit
      </Button>
    </Form>
  )
}
