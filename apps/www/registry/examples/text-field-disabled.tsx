import { TextField } from "@opengovsg/oui"

export default function TextFieldDisabled() {
  return (
    <TextField
      label="Full name"
      defaultValue="John Doe"
      isDisabled
    />
  )
}
