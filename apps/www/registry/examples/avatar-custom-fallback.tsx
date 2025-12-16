"use client"

import { SettingsIcon } from "lucide-react"

import { Avatar } from "@opengovsg/oui"

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
