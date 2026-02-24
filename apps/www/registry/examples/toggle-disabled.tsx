import { Toggle } from "@opengovsg/oui"

export default function ToggleDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <Toggle isDisabled>Disabled (off)</Toggle>
      <Toggle isDisabled defaultSelected>
        Disabled (on)
      </Toggle>
    </div>
  )
}
