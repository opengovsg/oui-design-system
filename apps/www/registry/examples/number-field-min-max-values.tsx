import { NumberField } from "@opengovsg/oui"

export default function NumberFieldMinMaxValues() {
  return (
    <NumberField
      label="Quantity"
      description="Min: 0, Max: 100"
      minValue={0}
      maxValue={100}
      defaultValue={0}
    />
  )
}
