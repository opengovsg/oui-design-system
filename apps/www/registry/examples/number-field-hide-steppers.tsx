import { NumberField } from "@opengovsg/oui"

export default function NumberFieldHideSteppers() {
  return (
    <NumberField
      label="Amount"
      hideSteppers
      inputProps={{
        placeholder: "Enter amount",
      }}
    />
  )
}
