"use client"

import { Avatar, AvatarGroup } from "@opengovsg/oui"

export default function AvatarGroupTotal() {
  return (
    <AvatarGroup max={3} total={10}>
      <Avatar name="John Doe">
        <Avatar.Image src="https://gravatar.com/avatar/193a23ae8a55c4144ae512bb64567c9f?s=400&d=monsterid&r=x" />
        <Avatar.Fallback />
      </Avatar>
      <Avatar name="Jane Smith">
        <Avatar.Image src="https://gravatar.com/avatar/577cd0a8c4a76de416036642cfb4b53c?s=400&d=monsterid&r=x" />
        <Avatar.Fallback />
      </Avatar>
      <Avatar name="Bruce Wayne">
        <Avatar.Image src="https://gravatar.com/avatar/746aa139bc568ddbb7a9dd6ee5f98ba0?s=400&d=monsterid&r=x" />
        <Avatar.Fallback />
      </Avatar>
      <Avatar name="Bob Wilson">
        <Avatar.Image src="https://gravatar.com/avatar/8f62f3c9f639118db002a94e64823d18?s=400&d=monsterid&r=x" />
        <Avatar.Fallback />
      </Avatar>
    </AvatarGroup>
  )
}
