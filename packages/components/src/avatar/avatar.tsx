"use client"

import { avatarStyles, VariantProps } from "@opengovsg/oui-theme"

interface AvatarProps extends VariantProps<typeof avatarStyles> {}

export const Avatar = ({  }: AvatarProps) => {
  return (
    <div>
      <h1>avatar</h1>
    </div>
  )
}
