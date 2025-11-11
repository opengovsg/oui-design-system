import { NumberField } from "@opengovsg/oui"

export default function NumberFieldWithErrorMessage() {
  return (
    <NumberField
      label="Age"
      minValue={18}
      maxValue={100}
      defaultValue={15}
      isInvalid
      errorMessage="Age must be between 18 and 100"
    />
  )
}
