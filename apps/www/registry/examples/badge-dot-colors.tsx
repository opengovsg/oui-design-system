import { Badge } from "@opengovsg/oui"

export default function BadgeDotColors() {
  return (
    <div className="flex gap-4">
      <Badge variant="dot" color="main">
        Main
      </Badge>
      <Badge variant="dot" color="sub">
        Sub
      </Badge>
      <Badge variant="dot" color="neutral">
        Neutral
      </Badge>
      <Badge variant="dot" color="critical">
        Critical
      </Badge>
      <Badge variant="dot" color="success">
        Success
      </Badge>
      <Badge variant="dot" color="warning">
        Warning
      </Badge>
    </div>
  )
}
