import { Toggle } from "@opengovsg/oui"

export default function ToggleCustomStyles() {
  return (
    <Toggle
      defaultSelected
      classNames={{
        base: "gap-4 rounded-lg bg-blue-50 px-4 py-3",
        track: "rounded-sm bg-blue-200 in-selected:bg-blue-600",
        thumb: "rounded-sm border-0 shadow-md",
      }}
    >
      Squared toggle
    </Toggle>
  )
}
