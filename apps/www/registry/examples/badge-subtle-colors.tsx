import { Badge } from "@opengovsg/oui"

export default function BadgeSubtleColors() {
  return (
    <div className="flex gap-4">
      <Badge variant="subtle" color="main">
        Main
      </Badge>
      <Badge variant="subtle" color="sub">
        Sub
      </Badge>
      <Badge variant="subtle" color="neutral">
        Neutral
      </Badge>
      <Badge variant="subtle" color="critical">
        Critical
      </Badge>
      <Badge variant="subtle" color="success">
        Success
      </Badge>
      <Badge variant="subtle" color="warning">
        Warning
      </Badge>
    </div>
  )
}
