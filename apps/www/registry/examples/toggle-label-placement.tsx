import { Toggle } from "@opengovsg/oui"

export default function ToggleLabelPlacement() {
  return (
    <div className="flex flex-col gap-4">
      <Toggle labelPlacement="end">Label at end (default)</Toggle>
      <Toggle labelPlacement="start">Label at start</Toggle>
    </div>
  )
}
