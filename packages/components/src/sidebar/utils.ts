import type {
  GeneratedHeader,
  GeneratedList,
  GeneratedSidebarItem,
} from "./types"

export const isNestableItem = (
  item: GeneratedSidebarItem,
): item is GeneratedList => {
  return "subItems" in item
}
export const isHeaderItem = (
  item: GeneratedSidebarItem,
): item is GeneratedHeader => {
  return "type" in item && item.type === "header"
}
