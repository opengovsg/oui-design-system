import { Badge } from "@opengovsg/oui"

export default function BadgeRadii() {
  return (
    <div className="flex items-center gap-4">
      <Badge radius="full">Full</Badge>
      <Badge radius="lg">Large</Badge>
      <Badge radius="md">Medium</Badge>
      <Badge radius="sm">Small</Badge>
      <Badge radius="none">None</Badge>
    </div>
  )
}
