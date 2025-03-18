import { Badge } from "@opengovsg/oui"

export default function BadgeOutlineColors() {
  return (
    <div className="flex gap-4">
      <Badge variant="outline" color="main">
        Main
      </Badge>
      <Badge variant="outline" color="sub">
        Sub
      </Badge>
      <Badge variant="outline" color="neutral">
        Neutral
      </Badge>
      <Badge variant="outline" color="critical">
        Critical
      </Badge>
      <Badge variant="outline" color="success">
        Success
      </Badge>
      <Badge variant="outline" color="warning">
        Warning
      </Badge>
    </div>
  )
}
