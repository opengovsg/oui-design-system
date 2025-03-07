import { InputHTMLAttributes, useMemo, useRef } from "react"
import { mergeProps } from "@react-aria/utils"
import { DOMAttributes, RefObject, ValidationResult } from "@react-types/shared"
import {
  useCombobox,
  UseComboboxReturnValue,
  useMultipleSelection,
  UseMultipleSelectionReturnValue,
} from "downshift"
import { AriaListBoxOptions, useTextField } from "react-aria"
import { SetRequired } from "type-fest"

import { pickAriaAttributes } from "../system/utils"
import { TagFieldProps } from "./types"
import { TagFieldState } from "./use-tag-field-state"

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
  listBoxProps: AriaListBoxOptions<T>

  /** Props for the list box items. */
  listItemProps: Pick<
    UseComboboxReturnValue<T>,
    "getItemProps" | "highlightedIndex"
  >

  /** Props for the chips in the tag field. */
  chipsProps: Pick<
    UseMultipleSelectionReturnValue<T>,
    "getSelectedItemProps" | "removeSelectedItem"
  >

  /** Props for the optional trigger button, to be passed to [useButton](useButton.html). */
  buttonProps: ReturnType<UseComboboxReturnValue<T>["getToggleButtonProps"]>
  /** Props for the combo box description element, if any. */
  descriptionProps: DOMAttributes
  /** Props for the combo box error message element, if any. */
  errorMessageProps: DOMAttributes

  /** Whether the popover is open. */
  isOpen: boolean
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
    // isReadOnly,
    // isDisabled,
    itemToKey,
    itemToText,
    label,
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
    isItemDisabled: (item) => disabledKeysSet.has(itemToKey(item)),
    items,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue,
    stateReducer(_state, actionAndChanges) {
      const { changes, type } = actionAndChanges

      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            isOpen: shouldCloseOnBlur === false ? true : changes.isOpen,
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
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur: {
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
      isReadOnly: props.isReadOnly,
      isDisabled: props.isDisabled,
      errorMessage: props.errorMessage,
      isInvalid: props.isInvalid,
      description: props.description,
      label,
      ...inputProps,
      onChange: (v) => setInputValue(v),
      value: state.inputValue,
    },
    inputRef,
  )

  return {
    labelProps: mergeProps(getLabelProps({ ref: labelRef }), labelProps),
    // Only pick aria attributes so downshift's event handlers will not be overridden
    inputProps: mergeProps(inputProps, pickAriaAttributes(newInputProps)),
    buttonProps: getToggleButtonProps({ ref: buttonRef }),
    listBoxProps: getMenuProps({ ref: listBoxRef }, { suppressRefError: true }),
    listItemProps: {
      getItemProps,
      highlightedIndex,
    },
    descriptionProps,
    errorMessageProps,
    isOpen,
    isInvalid,
    validationErrors,
    validationDetails,
    chipsProps: {
      getSelectedItemProps,
      removeSelectedItem,
    },
  }
}
