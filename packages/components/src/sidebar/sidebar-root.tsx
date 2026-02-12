import type { PropsWithChildren } from "react"
import { Provider } from "react-aria-components"

import type {
  SidebarSlots,
  SidebarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { sidebarStyles } from "@opengovsg/oui-theme"

import { mapPropsVariants } from "../system/utils"
import { SidebarStyleContext } from "./context"

export interface SidebarRootProps
  extends PropsWithChildren<SidebarVariantProps> {
  className?: string
  classNames?: SlotsToClasses<SidebarSlots>
}

export const SidebarRoot = ({
  className,
  classNames,
  ...originalProps
}: SidebarRootProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    sidebarStyles.variantKeys,
  )
  const slots = sidebarStyles(variantProps)
  return (
    <Provider values={[[SidebarStyleContext, { slots, classNames }]]}>
      <nav
        className={slots.base({
          className: className ?? classNames?.base,
        })}
      >
        <ul
          className={slots.ul({
            className: classNames?.ul,
          })}
          {...props}
        />
      </nav>
    </Provider>
  )
}
