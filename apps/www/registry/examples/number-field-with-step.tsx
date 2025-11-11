import { NumberField } from "@opengovsg/oui"

export default function NumberFieldWithStep() {
  return (
    <NumberField
      label="Volume"
      description="Adjust in increments of 5"
      step={5}
      defaultValue={50}
    />
  )
}
