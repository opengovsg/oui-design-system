import { NumberField } from "@opengovsg/oui"

export default function NumberFieldDemo() {
  return (
    <NumberField
      aria-label="Enter your favourite number"
      inputProps={{
        placeholder: "Enter your favourite number",
      }}
    />
  )
}
