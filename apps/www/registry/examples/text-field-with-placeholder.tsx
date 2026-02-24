import { TextField } from "@opengovsg/oui"

export default function TextFieldWithPlaceholder() {
  return (
    <TextField
      label="Email"
      inputProps={{
        placeholder: "you@example.com",
      }}
    />
  )
}
