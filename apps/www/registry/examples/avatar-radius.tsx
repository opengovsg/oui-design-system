"use client"

import { Avatar } from "@opengovsg/oui"

export default function AvatarRadius() {
  return (
    <div className="flex items-center gap-4">
      <Avatar radius="none" name="None">
        <Avatar.Fallback />
      </Avatar>
      <Avatar radius="sm" name="SM">
        <Avatar.Fallback />
      </Avatar>
      <Avatar radius="md" name="MD">
        <Avatar.Fallback />
      </Avatar>
      <Avatar radius="lg" name="LG">
        <Avatar.Fallback />
      </Avatar>
      <Avatar radius="full" name="Full">
        <Avatar.Fallback />
      </Avatar>
    </div>
  )
}
