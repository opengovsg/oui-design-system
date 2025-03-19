import { Badge } from "@opengovsg/oui"

export default function BadgeSizes() {
  return (
    <div className="flex items-center gap-4">
      <Badge size="xs">Extra-small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  )
}
