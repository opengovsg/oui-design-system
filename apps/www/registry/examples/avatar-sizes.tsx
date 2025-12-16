"use client"

import { Avatar } from "@opengovsg/oui"

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="2xs" name="2XS">
        <Avatar.Fallback />
      </Avatar>
      <Avatar size="xs" name="XS">
        <Avatar.Fallback />
      </Avatar>
      <Avatar size="sm" name="SM">
        <Avatar.Fallback />
      </Avatar>
      <Avatar size="md" name="MD">
        <Avatar.Fallback />
      </Avatar>
    </div>
  )
}
