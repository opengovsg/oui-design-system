"use client"

import { useMemo } from "react"
import { Provider } from "react-aria-components"

import type { SidebarVariantProps } from "@opengovsg/oui-theme"
import { sidebarStyles } from "@opengovsg/oui-theme"

import type { GeneratedSidebarItem } from "./types"
import { mapPropsVariants } from "../system/utils"
import { SidebarStyleContext } from "./context"
import { SidebarHeader } from "./sidebar-header"
import { SidebarItem } from "./sidebar-item"
import { SidebarList } from "./sidebar-list"
import { isHeaderItem, isNestableItem } from "./utils"

// Generate recursive sidebar items if nested
export const generateSidebarItems = (items: GeneratedSidebarItem[]) => {
  return items.map((item, index) => {
    if (isNestableItem(item)) {
      const { label, subItems, ...rest } = item
      return (
        <SidebarList key={index} label={label} {...rest}>
          {generateSidebarItems(subItems)}
        </SidebarList>
      )
    }
    if (isHeaderItem(item)) {
      return <SidebarHeader key={index} {...item} />
    }

    return <SidebarItem key={index} {...item} />
  })
}

export interface SidebarProps extends SidebarVariantProps {
  items: GeneratedSidebarItem[]
}

export const Sidebar = ({ items, ...originalProps }: SidebarProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    sidebarStyles.variantKeys,
  )
  const slots = sidebarStyles(variantProps)
  const sidebarItems = useMemo(() => generateSidebarItems(items), [items])
  return (
    <Provider values={[[SidebarStyleContext, { slots }]]}>
      <nav>
        <ul {...props}>{sidebarItems}</ul>
      </nav>
    </Provider>
  )
}
