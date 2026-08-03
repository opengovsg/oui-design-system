import type { FormValidationState } from "@react-stately/form"
import { useFormValidationState } from "@react-stately/form"
import { useControlledState } from "@react-stately/utils"
import type { Key } from "@react-types/shared"
import { useCallback, useMemo } from "react"
import type { SetRequired } from "type-fest"

import { useControllableState } from "../hooks"
import type { TagFieldProps } from "./types"

export interface TagFieldListState<T> {
  /** Sets the selected items. */
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>

  /** A set of items that are disabled. */
  disabledKeys?: Iterable<Key>

  /** The values of the currently selected items. */
  readonly selectedItems: T[]
}

export interface TagFieldState<T>
  extends
    TagFieldListState<T>,
    FormValidationState,
    Required<Pick<TagFieldStateOptions<T>, "itemToKey" | "itemToText">> {
  /** The current value of the tag field input. */
  inputValue: string
  /** Sets the value of the tag field input. */
  setInputValue(value: string): void

  /** The current items to be displayed */
  items: T[]
}

type FilterFn = (textValue: string, inputValue: string) => boolean

export interface TagFieldStateOptions<T> extends SetRequired<
  Omit<TagFieldProps<T>, "children" | "onSelectionChange">,
  "itemToKey" | "itemToText"
> {
  /** The filter function used to determine if a option should be included in the combo box list. */
  defaultFilter?: FilterFn
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (nextItems: T[]) => void
}

/**
 * Provides state management for a tag field component. Handles building a collection
 * of items from props and manages the option selection state of the tag field. In addition, it tracks the input value,
 * focus state, and other properties of the tag field.
 */
export function useTagFieldState<T extends object>(
  props: TagFieldStateOptions<T>,
): TagFieldState<T> {
  const { itemToText, itemToKey, defaultFilter } = props

  const itemsByKey = useMemo(() => {
    const items = props.items ?? props.defaultItems ?? []
    return (
      items.reduce(
        (acc, item) => {
          acc[itemToKey(item)] = item
          return acc
        },
        {} as Record<Key, T>,
      ) ?? {}
    )
  }, [itemToKey, props.defaultItems, props.items])

  const getSelectedItemsByKey = useCallback(
    (keys?: Set<Key>) => {
      if (!keys) return
      return [...keys].map((key) => itemsByKey[key])
    },
    [itemsByKey],
  )

  const [selectedItems, setSelectedItems] = useControllableState({
    defaultValue: getSelectedItemsByKey(props.defaultSelectedKeys) ?? [],
    value: getSelectedItemsByKey(props.selectedKeys),
    onChange: props.onSelectionChange,
  })

  const defaultInputValue = props.defaultInputValue ?? ""

  const [inputValue, setInputValue] = useControlledState(
    props.inputValue,
    defaultInputValue,
    props.onInputChange,
  )

  const controlledSelectedKeys = useMemo(
    () => new Set(selectedItems.map(itemToKey)),
    [itemToKey, selectedItems],
  )

  const validation = useFormValidationState({
    ...props,
    value: useMemo(
      () => ({
        inputValue,
        selectedKeys: controlledSelectedKeys,
      }),
      [controlledSelectedKeys, inputValue],
    ),
  })

  const filteredItems = useMemo(
    () =>
      // No default filter if items are controlled.
      !!props.items || !defaultFilter
        ? (props.items ?? [])
        : filterItems({
            items: props.defaultItems ?? [],
            inputValue,
            itemToText,
            itemToKey,
            selectedKeys: controlledSelectedKeys,
            filter: defaultFilter,
          }),
    [
      props.items,
      props.defaultItems,
      defaultFilter,
      inputValue,
      itemToText,
      itemToKey,
      controlledSelectedKeys,
    ],
  )

  return {
    items: filteredItems,
    disabledKeys: props.disabledKeys,
    inputValue,
    setInputValue,
    selectedItems,
    setSelectedItems,
    itemToText,
    itemToKey,
    ...validation,
  }
}

function filterItems<T extends object>({
  items,
  inputValue,
  itemToText,
  itemToKey,
  filter,
  selectedKeys,
}: {
  items: T[]
  inputValue: string
  itemToText: (item: T) => string
  itemToKey: (item: T) => Key
  filter: FilterFn
  selectedKeys?: Set<Key>
}): T[] {
  return items.filter((item) => {
    const isSelected = selectedKeys ? selectedKeys.has(itemToKey(item)) : false
    if (isSelected) return false
    const matchesFilter = filter(itemToText(item), inputValue)
    return matchesFilter
  })
}
