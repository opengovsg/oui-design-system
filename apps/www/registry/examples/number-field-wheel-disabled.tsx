import { NumberField } from "@opengovsg/oui"

export default function NumberFieldWheelDisabled() {
  return (
    <NumberField
      label="Price"
      isWheelDisabled
      defaultValue={100}
      description="Mouse wheel scrolling is disabled"
    />
  )
}
