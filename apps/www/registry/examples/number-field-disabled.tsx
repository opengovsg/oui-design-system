import { NumberField } from "@opengovsg/oui"

export default function NumberFieldDisabled() {
  return (
    <NumberField
      label="Quantity"
      isDisabled
      inputProps={{
        placeholder: "This field is disabled",
      }}
    />
  )
}
