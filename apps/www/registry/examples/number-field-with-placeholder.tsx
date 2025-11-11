import { NumberField } from "@opengovsg/oui"

export default function NumberFieldWithPlaceholder() {
  return (
    <NumberField
      label="Age"
      inputProps={{
        placeholder: "Enter your age",
      }}
    />
  )
}
