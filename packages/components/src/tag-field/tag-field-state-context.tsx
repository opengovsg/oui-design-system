import type {
  UseComboboxReturnValue,
  UseMultipleSelectionReturnValue,
} from "downshift"
import { createContext } from "react"

import { TagFieldState } from "./use-tag-field-state"

interface TagFieldStateContextValue<T>
  extends TagFieldState<T>,
    Pick<UseComboboxReturnValue<T>, "getItemProps" | "highlightedIndex">,
    Pick<
      UseMultipleSelectionReturnValue<T>,
      "getSelectedItemProps" | "removeSelectedItem"
    > {
  isOpen: boolean
  isInvalid: boolean
  isDisabled: boolean
  isReadOnly: boolean
}

export const TagFieldStateContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<TagFieldStateContextValue<any> | null>(null)
