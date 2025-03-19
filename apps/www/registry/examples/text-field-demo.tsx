import { TextField } from "@opengovsg/oui"

export default function TextFieldDemo() {
  return (
    <TextField
      label="First name"
      inputProps={{
        placeholder: "John",
      }}
    />
  )
}
