import { PhoneNumberField } from "@opengovsg/oui"

export default function PhoneNumberFieldSizes() {
  return (
    <div className="flex flex-col gap-6">
      <PhoneNumberField size="xs" label="Extra Small" />
      <PhoneNumberField size="sm" label="Small" />
      <PhoneNumberField size="md" label="Medium (default)" />
    </div>
  )
}
