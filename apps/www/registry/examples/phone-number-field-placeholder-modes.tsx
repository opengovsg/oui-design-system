import { PhoneNumberField } from "@opengovsg/oui"

export default function PhoneNumberFieldPlaceholderModes() {
  return (
    <div className="flex flex-col gap-6">
      <PhoneNumberField label="Polite (default)" placeholderMode="polite" />
      <PhoneNumberField label="Aggressive" placeholderMode="aggressive" />
      <PhoneNumberField label="Off" placeholderMode="off" />
    </div>
  )
}
