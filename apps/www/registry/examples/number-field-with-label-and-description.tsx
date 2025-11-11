import { NumberField } from "@opengovsg/oui"

export default function NumberFieldWithLabelAndDescription() {
  return (
    <NumberField
      label="Quantity"
      description="Enter the quantity you want to order"
    />
  )
}
