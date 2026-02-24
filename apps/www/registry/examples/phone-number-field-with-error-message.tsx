import { PhoneNumberField } from "@opengovsg/oui"

export default function PhoneNumberFieldWithErrorMessage() {
  return (
    <PhoneNumberField
      label="Contact number"
      isInvalid
      errorMessage="Please enter a valid contact number."
    />
  )
}
