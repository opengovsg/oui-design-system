import type {
  DOMAttributes,
  RefObject,
  ValidationResult,
} from "@react-types/shared"
import type { Virtualizer } from "@tanstack/react-virtual"
import type {
  UseComboboxPropGetters,
  UseComboboxReturnValue,
  UseMultipleSelectionReturnValue,
} from "downshift"
import type { InputHTMLAttributes } from "react"
import type { SetRequired } from "type-fest"
import { useCallback, useMemo, useRef } from "react"
import { mergeProps } from "@react-aria/utils"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useCombobox, useMultipleSelection } from "downshift"
import { omit } from "lodash-es"
import { useTextField } from "react-aria"

import type { TagFieldProps } from "./types"
import type { TagFieldState } from "./use-tag-field-state"

export interface AriaTagFieldOptions<T>
  extends SetRequired<
    Omit<TagFieldProps<T>, "children">,
    "itemToKey" | "itemToText"
  > {
  /** The ref for the optional label element. */
  labelRef?: RefObject<HTMLLabelElement | null>
  /** The ref for the input element. */
  inputRef: RefObject<HTMLInputElement | null>
  /** The ref for the list box. */
  listBoxRef: RefObject<HTMLElement | null>
  /** The ref for the optional list box popup trigger button.  */
  buttonRef?: RefObject<HTMLButtonElement | null>
}

export interface TagFieldAria<T> extends ValidationResult {
  /** Props for the label element. */
  labelProps: DOMAttributes
  /** Props for the combo box input element. */
  inputProps: InputHTMLAttributes<HTMLInputElement>
  /** Props for the list box */
  listBoxProps: ReturnType<UseComboboxPropGetters<T>["getMenuProps"]>

  /** Props to augment tag field state. */
  tagFieldProps: Pick<
    UseComboboxReturnValue<T>,
    "getItemProps" | "highlightedIndex"
  > &
    Pick<
      UseMultipleSelectionReturnValue<T>,
      "getSelectedItemProps" | "removeSelectedItem"
    > & {
      /** Whether the popover is open. */
      isOpen: boolean
      isInvalid: boolean
      isDisabled: boolean
      isReadOnly: boolean
    }

  /** Props for the optional trigger button, to be passed to [useButton](useButton.html). */
  buttonProps: ReturnType<UseComboboxReturnValue<T>["getToggleButtonProps"]>
  /** Props for the combo box description element, if any. */
  descriptionProps: DOMAttributes
  /** Props for the combo box error message element, if any. */
  errorMessageProps: DOMAttributes

  rowVirtualizer: Virtualizer<HTMLElement, Element> | null
}

function useOptionalVirtualizer(
  isVirtualized: boolean,
  options: Parameters<typeof useVirtualizer<HTMLElement, Element>>[0],
): Virtualizer<HTMLElement, Element> | null {
  const virtualizer = useVirtualizer(options)
  return isVirtualized ? virtualizer : null
}

/**
 * Provides the behavior and accessibility implementation for a tag field component.
 * A tag field combines a text input with a listbox, allowing users to filter a list of options to items matching a query.
 * @param props - Props for the tag field.
 * @param state - State for the select, as returned by `useTagFieldState`.
 */
export function useTagField<T>(
  props: AriaTagFieldOptions<T>,
  state: TagFieldState<T>,
): TagFieldAria<T> {
  let { buttonRef } = props
  const {
    inputRef,
    listBoxRef,
    labelRef,
    shouldCloseOnBlur,
    // TODO: Handle these states
    isReadOnly,
    isDisabled,
    itemToKey,
    itemToText,
    label,
    virtualRowHeight = 40,
    isVirtualized = true,
  } = props

  const backupBtnRef = useRef(null)
  buttonRef = buttonRef ?? backupBtnRef

  const {
    selectedItems,
    setSelectedItems,
    inputValue,
    setInputValue,
    items,
    disabledKeys,
  } = state

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems,
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes
            .FunctionRemoveSelectedItem: {
            if (isDisabled) return
            setSelectedItems(newSelectedItems ?? [])
            break
          }
          default:
            break
        }
      },
    })

  const disabledKeysSet = useMemo(() => {
    return new Set(disabledKeys)
  }, [disabledKeys])

  const rowVirtualizer = useOptionalVirtualizer(isVirtualized, {
    count: items.length,
    getScrollElement: () => listBoxRef.current,
    estimateSize: () => virtualRowHeight,
    getItemKey: useCallback(
      (index: number) => itemToKey(items[index]),
      [itemToKey, items],
    ),
    overscan: 2,
  })

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    itemToString: (item) => {
      if (!item) {
        return ""
      }
      return itemToText(item)
    },
    isItemDisabled: (item) =>
      isDisabled || isReadOnly || disabledKeysSet.has(itemToKey(item)),
    items,
    // Noop for scrollIntoView if virtualized, as we'll handle it in onHighlightedIndexChange
    scrollIntoView: (node) => {
      if (!isVirtualized) {
        node.scrollIntoView({ block: "nearest" })
      }
    },
    onHighlightedIndexChange: ({ highlightedIndex, type }) => {
      if (
        type !== useCombobox.stateChangeTypes.MenuMouseLeave &&
        highlightedIndex >= 0
      ) {
        if (rowVirtualizer) {
          rowVirtualizer.scrollToIndex(highlightedIndex)
        }
      }
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue,
    stateReducer(_state, actionAndChanges) {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.InputBlur: {
          return {
            ...changes,
            isOpen: shouldCloseOnBlur === false ? true : changes.isOpen,
          }
        }
        default:
          return changes
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick: {
          if (newSelectedItem) {
            setSelectedItems((prev) => [...new Set([...prev, newSelectedItem])])
          }
          setInputValue("")
          break
        }
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue ?? "")
          break
        default:
          break
      }
    },
  })

  const { isInvalid, validationErrors, validationDetails } =
    state.displayValidation

  const inputProps = getInputProps({
    placeholder: props.placeholder,
    ref: inputRef,
    "aria-label": props["aria-label"],
    "aria-labelledby": props["aria-labelledby"],
    ...getDropdownProps({ preventKeyAction: isOpen }), // Somehow adding this will allow the input to be updated properly, else
    // it may sometimes lag behind a single state.
    // Was also in the previous downshift docs but they removed it for some reason.
    // See https://github.com/downshift-js/downshift/pull/1576/files#diff-d32b6994832dda99d96f207e964a0ef27102128c532ea9492949f21ec0cf58d3
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setInputValue(e.target.value),
  })

  const {
    labelProps,
    inputProps: newInputProps,
    descriptionProps,
    errorMessageProps,
  } = useTextField(
    {
      isReadOnly,
      isDisabled,
      isInvalid,
      errorMessage: props.errorMessage,
      description: props.description,
      label,
      ...inputProps,
      onChange: () => {},
      value: state.inputValue,
    },
    inputRef,
  )

  return {
    tagFieldProps: {
      isDisabled: newInputProps.disabled ?? false,
      isReadOnly: newInputProps.readOnly ?? false,
      isInvalid,
      getItemProps,
      highlightedIndex,
      isOpen,
      getSelectedItemProps,
      removeSelectedItem,
    },
    labelProps: mergeProps(getLabelProps({ ref: labelRef }), labelProps),
    // Remove onKeyDown from newInputProps to prevent it from being called twice, resulting in arrow keys moving two items.
    inputProps: mergeProps(inputProps, omit(newInputProps, "onKeyDown")),
    buttonProps: getToggleButtonProps({
      ref: buttonRef,
      disabled: isDisabled,
    }),
    listBoxProps: getMenuProps({ ref: listBoxRef }, { suppressRefError: true }),
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
    validationDetails,
    rowVirtualizer,
  }
}
