import type {
  FocusableProps,
  HelpTextProps,
  InputBase,
  Key,
  LabelableProps,
  MultipleSelection,
  TextInputBase,
  Validation,
} from "@react-types/shared"
import type { VirtualItem } from "@tanstack/react-virtual"
import type { UseComboboxReturnValue } from "downshift"
import type { ReactNode } from "react"

import type {
  SlotsToClasses,
  TagFieldItemSlots,
  TagFieldSlots,
  TagFieldVariantProps,
} from "@opengovsg/oui-theme"

export interface TagFieldValidationValue {
  /** The selected key in the TagField. */
  selectedKeys: Set<Key> | null
  /** The value of the TagField input. */
  inputValue: string
}

export interface TagFieldListRenderProps<T>
  extends ReturnType<UseComboboxReturnValue<T>["getItemProps"]> {
  item: T
  key: VirtualItem["key"]
  isHighlighted: boolean
  style?: React.CSSProperties
  className?: string
  itemClassNames?: SlotsToClasses<TagFieldItemSlots>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TagFieldRenderProps<T> extends TagFieldListRenderProps<T> {}

export interface TagFieldProps<T>
  extends Omit<
      MultipleSelection,
      | "disallowEmptySelection"
      | "onSelectionChange"
      | "selectionMode"
      | "selectedKeys"
      | "defaultSelectedKeys"
    >,
    InputBase,
    TextInputBase,
    Validation<TagFieldValidationValue>,
    FocusableProps<HTMLInputElement>,
    LabelableProps,
    HelpTextProps,
    TagFieldVariantProps {
  classNames?: SlotsToClasses<TagFieldSlots>
  itemClassNames?: SlotsToClasses<TagFieldItemSlots>
  children?: (values: TagFieldRenderProps<T>) => ReactNode
  /** The filter function used to determine if a option should be included in the combo box list. */
  defaultFilter?: (textValue: string, inputValue: string) => boolean
  /**
   * The function to retrieve the text value of the item.
   * @defaultValue `(item) => item.textValue`
   */
  itemToText?: (item: T) => string
  /**
   * The function to retrieve the key of the item.
   * @defaultValue `(item) => item.id`
   */
  itemToKey?: (item: T) => Key
  /** The currently selected keys in the collection (controlled). */
  selectedKeys?: Set<Key>
  /** The initial selected keys in the collection (uncontrolled). */
  defaultSelectedKeys?: Set<Key>
  /** The list of TagField items (uncontrolled). */
  defaultItems?: T[]
  /** The list of TagField items (controlled). */
  items?: T[]
  /** Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu. */
  onOpenChange?: (isOpen: boolean) => void
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (keys: Set<Key>) => void
  /** The value of the TagField input (controlled). */
  inputValue?: string
  /** The default value of the TagField input (uncontrolled). */
  defaultInputValue?: string
  /** Handler that is called when the TagField input value changes. */
  onInputChange?: (value: string) => void

  /**
   * If provided, virtual row height will be set to given value.
   */
  virtualRowHeight?: number
  /**
   * Whether the tag field menu should close on blur.
   * If not provided, the menu will close on blur when the user clicks outside the tag field.
   */
  shouldCloseOnBlur?: boolean
}
