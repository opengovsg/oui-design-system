import { TextField } from "@opengovsg/oui"

export default function TextFieldWithDescription() {
  return (
    <TextField
      label="Full name"
      description="As shown on your NRIC or FIN."
      inputProps={{
        placeholder: "Enter your full name",
      }}
    />
  )
}
