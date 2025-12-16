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
