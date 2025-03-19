"use client"

import { Badge } from "@opengovsg/oui"

export default function BadgeWithCloseButton() {
  return (
    <div className="flex gap-4">
      <Badge onClose={() => console.log("Badge closed")}>Badge</Badge>
      <Badge variant="dot" onClose={() => console.log("Badge closed")}>
        Badge
      </Badge>
    </div>
  )
}
