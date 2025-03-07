import {
  CollectionBase,
  FocusableProps,
  HelpTextProps,
  InputBase,
  Key,
  LabelableProps,
  MultipleSelection,
  TextInputBase,
  Validation,
} from "@react-types/shared"

export interface TagFieldValidationValue {
  /** The selected key in the TagField. */
  selectedKeys: Set<Key> | null
  /** The value of the TagField input. */
  inputValue: string
}

export type MenuTriggerAction = "focus" | "input" | "manual"

export interface TagFieldProps<T>
  extends CollectionBase<T>,
    Omit<
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
    HelpTextProps {
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
  selectedKeys?: Key[]
  /** The initial selected keys in the collection (uncontrolled). */
  defaultSelectedKeys?: Key[]
  /** The list of TagField items (uncontrolled). */
  defaultItems?: T[]
  /** The list of TagField items (controlled). */
  items?: T[]
  /** Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu. */
  onOpenChange?: (isOpen: boolean, menuTrigger?: MenuTriggerAction) => void
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (keys: Set<Key>) => void
  /** The value of the TagField input (controlled). */
  inputValue?: string
  /** The default value of the TagField input (uncontrolled). */
  defaultInputValue?: string
  /** Handler that is called when the TagField input value changes. */
  onInputChange?: (value: string) => void
  /** Whether the TagField allows a non-item matching chip to be created and selected via a custom input. */
  allowsCustomValue?: boolean

  /**
   * Whether the tag field menu should close on blur.
   * If not provided, the menu will close on blur when the user clicks outside the tag field.
   */
  shouldCloseOnBlur?: boolean
}
