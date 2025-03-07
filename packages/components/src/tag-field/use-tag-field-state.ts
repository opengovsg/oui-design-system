import { useMemo } from "react"
import {
  FormValidationState,
  useFormValidationState,
} from "@react-stately/form"
import { useControlledState } from "@react-stately/utils"
import { Key } from "@react-types/shared"
import { SetRequired } from "type-fest"

import { useControllableState } from "../hooks"
import { TagFieldProps } from "./types"

export interface TagFieldListState<T> {
  /** Sets the selected items. */
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>

  /** A set of items that are disabled. */
  disabledKeys?: Iterable<Key>

  /** The values of the currently selected items. */
  readonly selectedItems: T[]
}

export interface TagFieldState<T>
  extends TagFieldListState<T>,
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

export interface TagFieldStateOptions<T>
  extends SetRequired<
    Omit<TagFieldProps<T>, "children" | "onSelectionChange">,
    "itemToKey" | "itemToText"
  > {
  /** The filter function used to determine if a option should be included in the combo box list. */
  defaultFilter?: FilterFn
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (nextItems: T[]) => void
}

export interface TagFieldListProps<T> {
  /** The currently selected items in the collection (controlled). */
  selectedItems?: T[]
  /** The initial selected keys in the collection (uncontrolled). */
  defaultSelectedItems?: T[]
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (items: T[]) => void
  /** The currently disabled keys in the collection (controlled). */
  disabledKeys?: Iterable<Key>
}

function useTagFieldListState<T extends object>(
  props: TagFieldListProps<T>,
): TagFieldListState<T> {
  const [selectedItems, setSelectedItems] = useControllableState({
    defaultValue: props.defaultSelectedItems ?? [],
    value: props.selectedItems,
    onChange: props.onSelectionChange,
  })

  return {
    disabledKeys: props.disabledKeys,
    selectedItems,
    setSelectedItems,
  }
}

/**
 * Provides state management for a tag field component. Handles building a collection
 * of items from props and manages the option selection state of the tag field. In addition, it tracks the input value,
 * focus state, and other properties of the tag field.
 */
export function useTagFieldState<T extends object>(
  props: TagFieldStateOptions<T>,
): TagFieldState<T> {
  const {
    itemToText,
    itemToKey,
    defaultFilter,
    // allowsCustomValue,
  } = props

  const { setSelectedItems, selectedItems, disabledKeys } =
    useTagFieldListState({
      ...props,
      disabledKeys: props.disabledKeys,
    })

  const defaultInputValue = props.defaultInputValue ?? ""

  const [inputValue, setInputValue] = useControlledState(
    props.inputValue,
    defaultInputValue,
    props.onInputChange,
  )

  const validation = useFormValidationState({
    ...props,
    value: useMemo(
      () => ({
        inputValue,
        selectedKeys: new Set(selectedItems.map(itemToKey)),
      }),
      [inputValue, itemToKey, selectedItems],
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
            filter: defaultFilter,
          }),
    [props.items, props.defaultItems, defaultFilter, inputValue, itemToText],
  )

  return {
    items: filteredItems,
    disabledKeys,
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
  filter,
}: {
  items: T[]
  inputValue: string
  itemToText: (item: T) => string
  filter: FilterFn
}): T[] {
  return items.filter((item) => filter(itemToText(item), inputValue))
}
