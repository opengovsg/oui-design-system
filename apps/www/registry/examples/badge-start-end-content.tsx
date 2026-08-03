import { Badge } from "@opengovsg/oui"
import { BellIcon, CheckIcon } from "lucide-react"

export default function BadgeStartEndContent() {
  return (
    <div className="flex gap-4">
      <Badge
        color="success"
        startContent={<CheckIcon size={16} />}
        variant="outline"
      >
        Chip
      </Badge>
      <Badge color="main" endContent={<BellIcon size={16} />} variant="subtle">
        Badge
      </Badge>
    </div>
  )
}
