"use client"

import { Avatar } from "@opengovsg/oui"

export default function AvatarFallbacks() {
  return (
    <div className="flex items-center gap-4">
      {/* Default fallback (user icon) */}
      <Avatar>
        <Avatar.Image src="https://invalid-url.com/image.jpg" />
        <Avatar.Fallback />
      </Avatar>
      {/* Name-based fallback (initials) */}
      <Avatar name="John Doe">
        <Avatar.Image src="https://invalid-url.com/image.jpg" />
        <Avatar.Fallback />
      </Avatar>
    </div>
  )
}
