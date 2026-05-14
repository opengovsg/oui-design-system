import { Button, TextField } from "@opengovsg/oui"
import { Form } from "react-aria-components"

export default function FormsValidationNative() {
  return (
    <Form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <TextField
        name="email"
        label="Email"
        type="email"
        isRequired
        description="Errors appear after blur or submit."
      />
      <TextField
        name="username"
        label="Username"
        isRequired
        minLength={3}
        maxLength={20}
        description="3–20 characters."
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
