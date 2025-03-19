import { Badge } from "@opengovsg/oui"

export default function BadgeSolidColors() {
  return (
    <div className="flex gap-4">
      <Badge variant="solid" color="main">
        Main
      </Badge>
      <Badge variant="solid" color="sub">
        Sub
      </Badge>
      <Badge variant="solid" color="neutral">
        Neutral
      </Badge>
      <Badge variant="solid" color="critical">
        Critical
      </Badge>
      <Badge variant="solid" color="success">
        Success
      </Badge>
      <Badge variant="solid" color="warning">
        Warning
      </Badge>
    </div>
  )
}
