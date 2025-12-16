"use client"

import { Avatar, AvatarGroup } from "@opengovsg/oui"

export default function AvatarGroupCustomCount() {
  return (
    <AvatarGroup
      max={3}
      prominence="subtle"
      total={10}
      renderCount={(count) => (
        <p className="prose-body-1 text-base-content-medium ms-2">
          +{count} others
        </p>
      )}
    >
      <Avatar name="John Doe">
        <Avatar.Image src="https://gravatar.com/avatar/6dacc144e568aad3a645388f3635f795?s=400&d=robohash&r=x" />
        <Avatar.Fallback />
      </Avatar>
      <Avatar name="Jane Smith">
        <Avatar.Image src="https://gravatar.com/avatar/a05a9551ef03ec76331ee9ad60fae0e7?s=400&d=robohash&r=x" />
        <Avatar.Fallback />
      </Avatar>
      <Avatar name="Bruce Wayne">
        <Avatar.Image src="https://gravatar.com/avatar/193a23ae8a55c4144ae512bb64567c9f?s=400&d=robohash&r=x" />
        <Avatar.Fallback />
      </Avatar>
    </AvatarGroup>
  )
}
