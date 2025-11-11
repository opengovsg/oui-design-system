import { NumberField } from "@opengovsg/oui"

export default function NumberFieldRequired() {
  return (
    <NumberField
      label="Quantity"
      isRequired
      description="This field is required"
    />
  )
}
