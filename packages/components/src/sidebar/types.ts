import type { LinkProps } from "react-aria-components"

type BaseSidebarItemProps = {
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}

export interface SidebarItemProps extends BaseSidebarItemProps, LinkProps {
  isActive?: boolean | (() => boolean)
}

export type SidebarHeaderProps = BaseSidebarItemProps

export interface SidebarListProps extends BaseSidebarItemProps {
  label: React.ReactNode
  /** Controlled state for expansion of section */
  isExpanded?: boolean
  /** Uncontrolled state for expansion of section */
  defaultIsExpanded?: boolean
  /** Controlled callback for when section's expansion state changes */
  onExpand?: (nextState: boolean) => void
  /** Only allow toggling of expand state when clicking the caret.
   * Could be useful if user wants to use the list item as a link.
   *
   * @default false
   */
  onlyCaretToggle?: boolean
  /** Whether the element is currently active */
  isActive?: boolean | (() => boolean)
  /** Callback invoked when section is clicked */
  onClick?: () => void
}

interface GeneratedBase
  extends BaseSidebarItemProps,
    Pick<SidebarItemProps, "isActive"> {}
export interface GeneratedItem extends GeneratedBase, SidebarItemProps {}
export interface GeneratedHeader extends SidebarHeaderProps {
  type: "header"
}
export interface GeneratedList
  extends Omit<GeneratedBase, "children">,
    SidebarListProps {
  subItems: (GeneratedList | GeneratedItem | GeneratedHeader)[]
}

export type GeneratedSidebarItem =
  | GeneratedList
  | GeneratedItem
  | GeneratedHeader
