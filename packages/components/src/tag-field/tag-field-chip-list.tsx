import { useCallback, useContext } from "react"
import { UseMultipleSelectionReturnValue } from "downshift"

import { TagFieldStateContext } from "./tag-field-state-context"
import { TagFieldItem } from "./types"

interface TagFieldChipListRenderProps<T> {
  item: T
  itemProps: ReturnType<
    UseMultipleSelectionReturnValue<T>["getSelectedItemProps"]
  >
  removeSelectedItem: () => void
  isDisabled: boolean
  isReadOnly: boolean
}

export interface TagFieldChipListProps<T extends TagFieldItem> {
  className?: string
  children?:
    | React.ReactNode
    | ((values: TagFieldChipListRenderProps<T>) => React.ReactNode)
}

export const TagFieldChipList = <T extends TagFieldItem>(
  props: TagFieldChipListProps<T>,
) => {
  const {
    selectedItems,
    getSelectedItemProps,
    removeSelectedItem,
    isDisabled,
    isReadOnly,
  } = useContext(TagFieldStateContext)!

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
        className="rounded-md bg-gray-100 px-1 focus:bg-red-400"
        key={`selected-item-${index}`}
        {...itemProps}
      >
        {selectedItem.textValue}
        <span
          className="cursor-pointer px-1"
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveSelectedItem(selectedItem)()
          }}
        >
          &#10005;
        </span>
      </span>
    )
  })
}
