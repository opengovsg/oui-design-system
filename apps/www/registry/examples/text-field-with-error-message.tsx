import { TextField } from "@opengovsg/oui"

export default function TextFieldWithErrorMessage() {
  return (
    <TextField
      label="Email"
      isInvalid
      defaultValue="invalid-email"
      errorMessage="Please enter a valid email address."
    />
  )
}
