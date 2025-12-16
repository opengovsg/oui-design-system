"use client"

import { Avatar } from "@opengovsg/oui"

export default function AvatarColors() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar prominence="strong" color="primary" name="Strong Primary">
          <Avatar.Fallback />
        </Avatar>
        <Avatar prominence="subtle" color="primary" name="Subtle Primary">
          <Avatar.Fallback />
        </Avatar>
        <Avatar prominence="subtle" color="white" name="Subtle White">
          <Avatar.Fallback />
        </Avatar>
      </div>
    </div>
  )
}
