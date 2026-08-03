"use client"

import { Avatar } from "@opengovsg/oui"
import { SettingsIcon } from "lucide-react"

export default function AvatarCustomFallback() {
  return (
    <Avatar>
      <Avatar.Image src="https://invalid-url.com/image.jpg" />
      <Avatar.Fallback>
        <SettingsIcon />
      </Avatar.Fallback>
    </Avatar>
  )
}
