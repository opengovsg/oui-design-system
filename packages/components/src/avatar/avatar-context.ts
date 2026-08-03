import type {
  AvatarSlots,
  avatarStyles,
  SlotsToClasses,
} from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"
import type { ImageLoadingStatus } from "./use-img-loading-status"

export interface UseAvatarContextReturn {
  imageLoadingStatus: ImageLoadingStatus
  setImageLoadingStatus: React.Dispatch<
    React.SetStateAction<ImageLoadingStatus>
  >
  slots: ReturnType<typeof avatarStyles>
  classNames?: SlotsToClasses<AvatarSlots>
  name?: string

  getInitials: (name: string) => string
}
export const [AvatarContext, useAvatarContext] =
  createContext<UseAvatarContextReturn>({
    name: "AvatarContext",
    strict: true,
  })
