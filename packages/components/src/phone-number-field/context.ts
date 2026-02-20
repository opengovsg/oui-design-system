import { createContext } from "../system/react-utils"

export interface UseProvidePhoneInputContextReturn {
  triggerRef: React.RefObject<HTMLDivElement | null>
}

export const [PhoneInputContext, usePhoneInputContext] =
  createContext<UseProvidePhoneInputContextReturn>({
    name: "PhoneInputContext",
  })
