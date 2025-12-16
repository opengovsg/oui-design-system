import { AvatarFallback, AvatarImage, AvatarRoot } from "./avatar"

export type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
} from "./avatar"

export const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
})

// Named exports
export { AvatarRoot, AvatarImage, AvatarFallback }

// Context
export { AvatarContext, useAvatarContext } from "./avatar-context"
export type { UseAvatarContextReturn } from "./avatar-context"

// Avatar Group
export { AvatarGroup } from "./avatar-group"
export type { AvatarGroupProps } from "./avatar-group"

// Avatar Group Context
export { AvatarGroupProvider, useAvatarGroup } from "./avatar-group-context"
export type {
  UseAvatarGroupContextReturn,
  UseAvatarGroupProps,
} from "./avatar-group-context"
