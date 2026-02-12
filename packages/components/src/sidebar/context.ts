import type { sidebarStyles } from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"

export interface UseProvideSidebarStylesReturn {
  slots: ReturnType<typeof sidebarStyles>
}

export const [SidebarStyleContext, useSidebarStyleContext] =
  createContext<UseProvideSidebarStylesReturn>({
    name: "SidebarStyleContext",
  })

export interface SidebarNestContextProps {
  nested: boolean
}

export type SidebarNestContextReturn = SidebarNestContextProps

export const [SidebarNestContext, useSidebarNestContext] = createContext<
  SidebarNestContextReturn,
  false
>({
  name: "SidebarNestContext",
  strict: false,
  defaultValue: { nested: false },
})
