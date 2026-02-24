import { Toggle } from "@opengovsg/oui"

export default function ToggleSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Toggle size="xs">Extra small</Toggle>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium (default)</Toggle>
    </div>
  )
}
