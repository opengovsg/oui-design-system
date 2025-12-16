"use client"

import { Avatar } from "@opengovsg/oui"

export default function AvatarDemo() {
  return (
    <Avatar name="John Doe">
      <Avatar.Fallback />
    </Avatar>
  )
}
