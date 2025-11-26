"use client"

import type {
  Selection,
  TreeItemContentRenderProps,
} from "react-aria-components"
import { useMemo } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import {
  MenuTrigger,
  Tree,
  TreeItem,
  TreeItemContent,
} from "react-aria-components"

import { multiSelectStyles, tv, VariantProps } from "@opengovsg/oui-theme"

import { Button } from "../button"
import { Checkbox } from "../checkbox"
import { Popover } from "../popover"

// TODO: to refactor to multi-select.ts
const chevron = tv({
  base: "text-base-content-default h-5 w-5 transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "rotate-90 transform",
    },
  },
})

interface MultiSelectChildItem {
  id: string
  optionLabel: string
  selectedLabel: string // Shown in Button to display options selected. This is usually an shortened version of optionLabel
}
interface MultiSelectItem {
  id: string
  label: string
  children: Array<MultiSelectChildItem>
}

interface MultiSelectProps extends VariantProps<typeof multiSelectStyles> {
  "aria-label"?: string
  placeholder?: string
  selectedKeys: Array<string>
  defaultExpandedKeys: Array<string>
  onSelectionChange: (keys: Array<string> | null) => void
  items: Array<MultiSelectItem>
}

export const MultiSelect = ({
  "aria-label": ariaLabel,
  selectedKeys,
  onSelectionChange,
  items,
  defaultExpandedKeys,
  placeholder,
}: MultiSelectProps) => {
  const handleSelectionChange = (keys: Selection) => {
    const nextSelectedKeys = Array.from(keys).map(String)

    const addedKey = nextSelectedKeys.find(
      (key) => !selectedKeys?.includes(key),
    )
    if (addedKey) {
      handleKeyAdded(addedKey, nextSelectedKeys)
      return
    }

    const removedKey = selectedKeys?.find(
      (key) => !nextSelectedKeys.includes(key),
    )
    if (removedKey) {
      handleKeyRemoved(removedKey, nextSelectedKeys)
      return
    }
  }

  const handleKeyAdded = (
    addedKey: string,
    nextSelectedKeys: Array<string>,
  ) => {
    const parent = items.find((item) => item.id === addedKey)
    if (parent) {
      // Added a parent - select all children
      const childIds = parent.children.map((child) => child.id)
      const uniqueKeys = new Set([...nextSelectedKeys, ...childIds])
      onSelectionChange(Array.from(uniqueKeys))
      return
    }

    // Added a child item - select parent if all children are selected
    const parentOfAddedChild = items.find((item) =>
      item.children.some((child) => child.id === addedKey),
    ) as MultiSelectItem
    const allChildrenSelected = parentOfAddedChild.children.every((child) =>
      nextSelectedKeys.includes(child.id),
    )
    const parentNotSelected = !nextSelectedKeys.includes(parentOfAddedChild.id)
    if (allChildrenSelected && parentNotSelected) {
      onSelectionChange([...nextSelectedKeys, parentOfAddedChild.id])
      return
    }

    onSelectionChange(nextSelectedKeys)
  }

  const handleKeyRemoved = (
    removedKey: string,
    nextSelectedKeys: Array<string>,
  ) => {
    const parent = items.find((item) => item.id === removedKey)
    if (parent) {
      // Removed a parent - unselect all children
      const childIds = new Set(parent.children.map((child) => child.id))
      const filteredKeys = nextSelectedKeys.filter((key) => !childIds.has(key))
      onSelectionChange(filteredKeys)
      return
    }

    // Removed a child - unselect parent if it was selected
    const parentOfRemovedChild = items.find((item) =>
      item.children.some((child) => child.id === removedKey),
    ) as MultiSelectItem
    const parentIsSelected = nextSelectedKeys.includes(parentOfRemovedChild.id)
    if (parentIsSelected) {
      onSelectionChange(
        nextSelectedKeys.filter((key) => key !== parentOfRemovedChild.id),
      )
      return
    }

    onSelectionChange(nextSelectedKeys)
  }

  const handleClearAll = () => {
    onSelectionChange(null)
  }

  const displayLabel = useMemo(() => {
    if (!selectedKeys || selectedKeys.length === 0) {
      return placeholder
    }

    // Get labels for selected keys (excluding parent group keys)
    const selectedLabels: Array<string> = []
    items.forEach((item) => {
      item.children.forEach((child) => {
        if (selectedKeys.includes(child.id)) {
          selectedLabels.push(child.selectedLabel)
        }
      })
    })

    return selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder
  }, [selectedKeys, items, placeholder])

  return (
    <div className="min-w-0 flex-1">
      <MenuTrigger>
        <Button
          variant="outline"
          size="sm"
          className="border-base-divider-strong text-base-content-default pressed:bg-interaction-tinted-sub-hover prose-subhead-2 h-9 w-full justify-between rounded-lg border px-3 py-2 font-normal"
          endContent={<ChevronDown size={14} className="flex-shrink-0" />}
        >
          <span className="block min-w-0 truncate">{displayLabel}</span>
        </Button>
        <Popover className="w-fit">
          <Tree
            className="max-h-[288px] overflow-y-auto px-1 py-1"
            selectionMode="multiple"
            aria-label={ariaLabel}
            selectedKeys={selectedKeys ?? []}
            defaultExpandedKeys={defaultExpandedKeys}
            onSelectionChange={handleSelectionChange}
            items={items}
          >
            {(item) => {
              return (
                <TreeItem id={item.id} key={item.id} textValue={item.label}>
                  <TreeItemContent>
                    {({ isExpanded }: TreeItemContentRenderProps) => (
                      <div className="flex items-center">
                        <Button
                          isIconOnly
                          variant="clear"
                          size="xs"
                          slot="chevron"
                        >
                          <ChevronRight
                            aria-hidden
                            className={chevron({ isExpanded })}
                          />
                        </Button>

                        {/* TODO: Our OUI Checkbox Component is not vertically centered when used with another Sibling like in this case */}
                        <Checkbox
                          className="text-base-content flex w-full items-center p-[10px]"
                          size="xs"
                          slot="selection"
                        >
                          {item.label}
                        </Checkbox>
                      </div>
                    )}
                  </TreeItemContent>

                  {item.children.map((child) => (
                    <TreeItem
                      id={child.id}
                      key={child.id}
                      textValue={child.optionLabel}
                      className="ml-12"
                    >
                      <TreeItemContent>
                        <Checkbox className="w-full" size="xs" slot="selection">
                          {child.optionLabel}
                        </Checkbox>
                      </TreeItemContent>
                    </TreeItem>
                  ))}
                </TreeItem>
              )
            }}
          </Tree>

          {/* Sticky bottom bar border top */}
          <Button
            variant="clear"
            radius="none"
            size="lg"
            className="border-base-divider-medium prose-body-1 text-base-content-strong w-full justify-start border-l-0 border-r-0 border-t"
            onPress={handleClearAll}
          >
            Clear all
          </Button>
        </Popover>
      </MenuTrigger>
    </div>
  )
}
