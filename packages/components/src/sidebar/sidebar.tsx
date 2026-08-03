"use client"

import { useMemo } from "react"

import { SidebarHeader } from "./sidebar-header"
import { SidebarItem } from "./sidebar-item"
import { SidebarList } from "./sidebar-list"
import type { SidebarRootProps } from "./sidebar-root"
import { SidebarRoot } from "./sidebar-root"
import type { GeneratedSidebarItem } from "./types"
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

export interface SidebarProps extends SidebarRootProps {
  items: GeneratedSidebarItem[]
}

export const Sidebar = ({ items, ...props }: SidebarProps) => {
  const sidebarItems = useMemo(() => generateSidebarItems(items), [items])
  return <SidebarRoot {...props}>{sidebarItems}</SidebarRoot>
}
