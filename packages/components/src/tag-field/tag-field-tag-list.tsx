import type { UseMultipleSelectionReturnValue } from "downshift"
import type { Context } from "react"
import { useCallback, useContext } from "react"
import { XIcon } from "lucide-react"

import type { SlotsToClasses, TagFieldSlots } from "@opengovsg/oui-theme"

import type { TagFieldStateContextValue } from "./tag-field-state-context"
import { TagFieldStateContext } from "./tag-field-state-context"

interface TagFieldTagListRenderProps<T> {
  item: T
  itemProps: ReturnType<
    UseMultipleSelectionReturnValue<T>["getSelectedItemProps"]
  >
  removeSelectedItem: () => void
  isDisabled: boolean
  isReadOnly: boolean
}

export interface TagFieldTagListProps<T extends object> {
  classNames?: Pick<
    SlotsToClasses<TagFieldSlots>,
    "tag" | "tagIcon" | "tagText"
  >
  children?:
    | React.ReactNode
    | ((values: TagFieldTagListRenderProps<T>) => React.ReactNode)
}

export const TagFieldTagList = <T extends object>({
  classNames,
  ...props
}: TagFieldTagListProps<T>) => {
  const {
    selectedItems,
    getSelectedItemProps,
    removeSelectedItem,
    isDisabled,
    isReadOnly,
    itemToText,
  } = useContext(TagFieldStateContext)! as TagFieldStateContextValue<T>

  const handleRemoveSelectedItem = useCallback(
    (item: T) => () => {
      if (isDisabled || isReadOnly) return
      removeSelectedItem(item)
    },
    [isDisabled, isReadOnly, removeSelectedItem],
  )

  if (props.children !== undefined && typeof props.children !== "function") {
    return props.children
  }

  return selectedItems.map((selectedItem, index) => {
    const itemProps = getSelectedItemProps({
      disabled: isDisabled,
      readOnly: isReadOnly,
      selectedItem,
      index,
    })

    if (typeof props.children === "function") {
      return props.children({
        item: selectedItem,
        removeSelectedItem: handleRemoveSelectedItem(selectedItem),
        isDisabled,
        isReadOnly,
        itemProps,
      })
    }

    return (
      <span
        className={classNames?.tag}
        key={`selected-item-${index}`}
        {...itemProps}
      >
        <span className={classNames?.tagText}>{itemToText(selectedItem)}</span>
        <XIcon
          className={classNames?.tagIcon}
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveSelectedItem(selectedItem)()
          }}
        />
      </span>
    )
  })
}
