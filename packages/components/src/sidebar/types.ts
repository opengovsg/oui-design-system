import type { LinkProps } from "react-aria-components"

type BaseSidebarItemProps = {
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  /**
   * Will be used as the accessible label when the sidebar is collapsed
   */
  tooltip?: string
}

export interface SidebarItemProps extends BaseSidebarItemProps, LinkProps {
  /** Whether the element is currently selected */
  isSelected?: boolean | (() => boolean)
}

export type SidebarHeaderProps = BaseSidebarItemProps

export interface SidebarListProps extends SidebarItemProps {
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
  children: React.ReactNode
  /**
   * Props to be passed to the link component when the sidebar list is used as a link.
   * @note Will not be used if `onlyCaretToggle` is false, since the entire list item will be a trigger for the expansion.
   */
  linkProps?: LinkProps
}

interface GeneratedBase
  extends BaseSidebarItemProps, Pick<SidebarItemProps, "isSelected"> {}
export interface GeneratedItem extends GeneratedBase, SidebarItemProps {}
export interface GeneratedHeader extends SidebarHeaderProps {
  type: "header"
}
export interface GeneratedList
  extends Omit<GeneratedBase, "children">, SidebarListProps {
  subItems: (GeneratedList | GeneratedItem | GeneratedHeader)[]
}

export type GeneratedSidebarItem =
  | GeneratedList
  | GeneratedItem
  | GeneratedHeader
