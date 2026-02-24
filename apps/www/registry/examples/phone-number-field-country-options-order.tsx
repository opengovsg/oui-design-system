import { PhoneNumberField } from "@opengovsg/oui"

export default function PhoneNumberFieldCountryOptionsOrder() {
  return (
    <PhoneNumberField
      label="Contact number"
      countryOptionsOrder={["SG", "MY"]}
    />
  )
}
