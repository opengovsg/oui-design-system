"use client"

import { Avatar, AvatarGroup } from "@opengovsg/oui"

export default function AvatarGroupMax() {
  return (
    <AvatarGroup max={3}>
      <Avatar name="John Doe">
        <Avatar.Fallback />
      </Avatar>
      <Avatar name="Jane Smith">
        <Avatar.Fallback />
      </Avatar>
      <Avatar name="Bruce Wayne">
        <Avatar.Fallback />
      </Avatar>
      <Avatar name="Bob Wilson">
        <Avatar.Fallback />
      </Avatar>
    </AvatarGroup>
  )
}
