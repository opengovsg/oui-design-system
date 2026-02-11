import type { breadcrumbsStyles } from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"

export type BreadcrumbSeparator =
  | "slash"
  | "chevron"
  | Exclude<React.ReactNode, string>
  | (string & {})
  | null

export interface UseProvideBreadcrumbsStylesReturn {
  slots: ReturnType<typeof breadcrumbsStyles>
  separator?: BreadcrumbSeparator
}

export const [BreadcrumbsStyleContext, useBreadcrumbsStyleContext] =
  createContext<UseProvideBreadcrumbsStylesReturn, false>({
    name: "BreadcrumbsStyleContext",
    strict: false,
  })
