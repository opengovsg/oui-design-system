import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"
import { cn } from "@opengovsg/oui-theme"
import { useResizeObserver } from "@react-aria/utils"
import {
  useCombobox,
  UseComboboxPropGetters,
  UseComboboxReturnValue,
  useMultipleSelection,
  UseMultipleSelectionReturnValue,
} from "downshift"
import { AriaComboBoxProps, Key, useFilter } from "react-aria"
import {
  ComboBoxRenderProps,
  ContextValue,
  GroupContext,
  InputContext,
  LabelContext,
  Popover,
  PopoverContext,
  Provider,
  SlotProps,
  UNSTABLE_ListLayout,
  useContextProps,
} from "react-aria-components"
import { Selection, useListData } from "react-stately"

import { FieldGroup, Label } from "../field"
import { useControllableState } from "../hooks"
import { Input } from "../input"
import { RenderProps } from "../system/types"
import { forwardRef } from "../system/utils"

type TagFieldItem = {
  textValue: string
  key: Key
  description?: string
}

interface TagFieldRenderProps<T extends object>
  extends ComboBoxRenderProps,
    Pick<
      UseMultipleSelectionReturnValue<Key>,
      "getSelectedItemProps" | "removeSelectedItem"
    > {
  highlightedIndex?: number
  selectedItems: Key[]
  items?: T[]
}

export interface TagFieldProps<T extends object>
  extends Omit<
      AriaComboBoxProps<T>,
      | "children"
      | "placeholder"
      | "label"
      | "description"
      | "errorMessage"
      | "validationState"
      | "validationBehavior"
      | "isDisabled"
      | "isInvalid"
      | "isRequired"
      | "selectedKey"
      | "defaultSelectedKey"
      | "items"
    >,
    TagFieldRenderProps<T>,
    SlotProps {
  /** The filter function used to determine if a option should be included in the combo box list. */
  defaultFilter?: (textValue: string, inputValue: string) => boolean
  /**
   * Whether the text or key of the selected item is submitted as part of an HTML form.
   * When `allowsCustomValue` is `true`, this option does not apply and the text is always submitted.
   * @default 'key'
   */
  formValue?: "text" | "key"
  /** Whether the combo box allows the menu to be open when the collection is empty. */
  allowsEmptyCollection?: boolean

  /**
   * Whether to hide selected items from the dropdown.
   * @defaultValue `true`
   */
  hideSelectedItems?: boolean

  items?: T[]

  selectedKeys?: Key[]
  defaultSelectedKeys?: Key[]
}

export function MultipleComboBox<T extends TagFieldItem>({
  hideSelectedItems = true,
  defaultFilter,
  ...props
}: TagFieldProps<T>) {
  const [inputValue, setInputValue] = useControllableState<string>({
    defaultValue: props.defaultInputValue ?? "",
    value: props.inputValue,
    onChange: props.onInputChange,
  })
  const { contains } = useFilter({ sensitivity: "base" })

  const fieldRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

  const list = useListData<TagFieldItem>({
    initialItems: Array.from(props.items ?? props.defaultItems ?? []),
    initialSelectedKeys: props.defaultSelectedKeys,
    getKey: (item) => item.key,
  })

  const filteredItems = useMemo(() => {
    const selectedKeys = list.selectedKeys
    if (selectedKeys === "all") {
      return hideSelectedItems ? [] : list.items
    }
    const filterFn = defaultFilter ?? contains
    return list.items.filter((item) => {
      if (hideSelectedItems && selectedKeys.has(item.key)) {
        return false
      }
      return filterFn(item.textValue, inputValue)
    })
  }, [
    contains,
    defaultFilter,
    hideSelectedItems,
    inputValue,
    list.items,
    list.selectedKeys,
  ])

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: [...list.selectedKeys],
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            list.setSelectedKeys(new Set(newSelectedItems))
            break
          default:
            break
        }
      },
    })

  // Make menu width match field group
  const [menuWidth, setMenuWidth] = useState<string | null>(null)
  const onResize = useCallback(() => {
    if (fieldRef.current) {
      const fieldRect = fieldRef.current.getBoundingClientRect()
      setMenuWidth(fieldRect.right - fieldRect.left + "px")
    }
  }, [])

  useResizeObserver({
    ref: fieldRef,
    onResize,
  })

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items: filteredItems,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue,
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            list.setSelectedKeys(
              new Set([...list.selectedKeys, newSelectedItem.key]),
            )
          }
          setInputValue("")
          break
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue ?? "")
          break
        default:
          break
      }
    },
  })
  const layout = useMemo(() => {
    return new UNSTABLE_ListLayout({
      estimatedRowHeight: 48,
    })
  }, [])

  return (
    <Provider
      values={[
        [LabelContext, { ...getLabelProps({ ref: labelRef }) }],
        [
          PopoverContext,
          {
            ref: popoverRef,
            triggerRef: fieldRef,
            scrollRef: listBoxRef,
            placement: "bottom start",
            isNonModal: true,
            trigger: "TagField",
            style: { "--trigger-width": menuWidth } as React.CSSProperties,
          },
        ],
      ]}
    >
      <div className="w-[592px]">
        <div className="flex flex-col gap-1">
          <Label>hehe</Label>
          <div
            className="inline-flex flex-wrap items-center gap-2 bg-white p-1.5 shadow-sm"
            ref={fieldRef}
          >
            {[...list.selectedKeys].map(
              function renderSelectedItem(selectedItemForRender, index) {
                return (
                  <span
                    className="rounded-md bg-gray-100 px-1 focus:bg-red-400"
                    key={`selected-item-${index}`}
                    {...getSelectedItemProps({
                      selectedItem: selectedItemForRender,
                      index,
                    })}
                  >
                    {selectedItemForRender.toString()}
                    <span
                      className="cursor-pointer px-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeSelectedItem(selectedItemForRender)
                      }}
                    >
                      &#10005;
                    </span>
                  </span>
                )
              },
            )}
            <div className="flex grow gap-0.5">
              <input
                placeholder="Best book ever"
                className="w-full"
                {...getInputProps({
                  ...getDropdownProps({ preventKeyAction: isOpen }),
                  // Somehow adding this will allow the input to be updated properly, else
                  // it may sometimes lag behind a single state.
                  // Was also in the previous downshift docs but they removed it for some reason.
                  // See https://github.com/downshift-js/downshift/pull/1576/files#diff-d32b6994832dda99d96f207e964a0ef27102128c532ea9492949f21ec0cf58d3
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value),
                })}
              />
              <button
                aria-label="toggle menu"
                className="px-2"
                type="button"
                {...getToggleButtonProps()}
              >
                &#8595;
              </button>
            </div>
          </div>
        </div>
        <Popover isOpen={isOpen} ref={popoverRef}>
          <ul
            className={`w-(--trigger-width) absolute z-10 mt-1 max-h-80 overflow-scroll bg-white p-0 shadow-md ${
              !(isOpen && filteredItems.length) && "hidden"
            }`}
            {...getMenuProps({ ref: listBoxRef }, { suppressRefError: true })}
          >
            {isOpen &&
              filteredItems.map((item, index) => (
                <li
                  className={cn(
                    highlightedIndex === index && "bg-blue-300",
                    selectedItem?.key === item.key && "font-bold",
                    "flex flex-col px-3 py-2 shadow-sm",
                  )}
                  key={item.key}
                  {...getItemProps({ item, index })}
                >
                  <span>{item.textValue}</span>
                </li>
              ))}
          </ul>
        </Popover>
        {/* <UNSTABLE_Virtualizer layout={layout}> */}
        {/* </UNSTABLE_Virtualizer> */}
      </div>
    </Provider>
  )
}

interface TagFieldChipProps<T = any> extends Partial<TagFieldChipContextValue> {
  item: T
  index: number
}
interface TagFieldChipContextValue
  extends SlotProps,
    Required<
      Pick<UseMultipleSelectionReturnValue<Key>, "getSelectedItemProps">
    > {}

export const TagFieldChipListContext =
  createContext<ContextValue<TagFieldChipContextValue, HTMLLIElement>>(null)

const TagFieldChip = forwardRef<"span", TagFieldChipProps>(
  ({ item, index }, ref) => {
    return (
      <span
        className="rounded-md bg-gray-100 px-1 focus:bg-red-400"
        key={`selected-item-${index}`}
      >
        {selectedItemForRender.toString()}
        <span
          className="cursor-pointer px-1"
          onClick={(e) => {
            e.stopPropagation()
            removeSelectedItem(selectedItemForRender)
          }}
        >
          &#10005;
        </span>
      </span>
    )
  },
)

export function TagField() {
  const books: TagFieldItem[] = [
    { key: "To Kill a Mockingbird", textValue: "To Kill a Mockingbird" },
    { key: "1984", textValue: "1984" },
    { key: "The Catcher in the Rye", textValue: "The Catcher in the Rye" },
    { key: "The Great Gatsby", textValue: "The Great Gatsby" },
  ]

  return (
    <TagFieldRoot
      items={[...Array(100)].map((_, i) => ({
        key: String(i),
        textValue: `Item ${i}`,
      }))}
    >
      {({ selectedItems, getSelectedItemProps, removeSelectedItem }) => (
        <>
          <Label>hehe</Label>
          <FieldGroup>
            {selectedItems.map((selectedItem, index) => {
              return (
                <span
                  className="rounded-md bg-gray-100 px-1 focus:bg-red-400"
                  key={`selected-item-${index}`}
                  {...getSelectedItemProps({
                    selectedItem,
                    index,
                  })}
                >
                  {selectedItem.toString()}
                  <span
                    className="cursor-pointer px-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSelectedItem(selectedItem)
                    }}
                  >
                    &#10005;
                  </span>
                </span>
              )
            })}
            <Input />
            <TagFieldTrigger>&#8595;</TagFieldTrigger>
          </FieldGroup>
          <Popover>
            <TagFieldList>
              {({ item, index }) => (
                <TagFieldListItem item={item} index={index} key={item.key} />
              )}
            </TagFieldList>
          </Popover>
        </>
      )}
    </TagFieldRoot>
  )
}

interface TagFieldState<T = any>
  extends Pick<UseComboboxReturnValue<T>, "getItemProps">,
    Pick<
      UseMultipleSelectionReturnValue<Key>,
      "getSelectedItemProps" | "removeSelectedItem"
    > {
  inputValue: string
  isOpen: boolean
  highlightedIndex: number
  selectedKeys: Selection
}

interface TagFieldTriggerProps extends SlotProps {}
interface TagFieldTriggerContextValue
  extends TagFieldTriggerProps,
    ReturnType<UseComboboxPropGetters<object>["getToggleButtonProps"]> {}

interface TagFieldListRenderProps<T> {
  item: T
  index: number
}

interface TagFieldListProps<T = any> extends Partial<TagFieldListContextValue> {
  children?: ReactNode | ((values: TagFieldListRenderProps<T>) => ReactNode)
}
interface TagFieldListContextValue
  extends SlotProps,
    ReturnType<UseComboboxPropGetters<object>["getMenuProps"]> {
  items: TagFieldItem[]
  isOpen: boolean
}

export const TagFieldContext =
  createContext<ContextValue<TagFieldProps<any>, HTMLDivElement>>(null)
export const TagFieldStateContext = createContext<TagFieldState | null>(null)
export const TagFieldTriggerContext = createContext<
  ContextValue<TagFieldTriggerContextValue, HTMLButtonElement>
>({})
export const TagFieldListContext =
  createContext<ContextValue<TagFieldListContextValue, HTMLUListElement>>(null)

interface TagFieldRootProps<T extends TagFieldItem>
  extends TagFieldProps<T>,
    RenderProps<TagFieldRenderProps<T>> {}

const TagFieldList = forwardRef<"ul", TagFieldListProps>((props, ref) => {
  ;[props, ref] = useContextProps(props, ref, TagFieldListContext)

  const { isOpen, items, slot, className, ...rest } = props

  if (!isOpen) {
    return null
  }
  return (
    <ul
      slot={slot ?? undefined}
      ref={ref}
      {...rest}
      className={cn(
        "w-(--trigger-width) absolute z-10 mt-1 max-h-80 overflow-scroll bg-white p-0 shadow-md",
        className,
      )}
    >
      {items?.map((item, index) => {
        if (typeof props.children === "function") {
          return props.children({
            item,
            index,
          })
        }
        return props.children
      })}
    </ul>
  )
})

const TagFieldTrigger = forwardRef<"button", TagFieldTriggerProps>(
  (props, ref) => {
    ;[props, ref] = useContextProps(props, ref, TagFieldTriggerContext)

    return (
      <button
        aria-label="toggle menu"
        className="px-2"
        type="button"
        {...props}
        slot={props.slot || undefined}
        ref={ref}
      />
    )
  },
)

function TagFieldRoot<T extends TagFieldItem>({
  hideSelectedItems = true,
  defaultFilter,
  children,
  ...props
}: TagFieldRootProps<T>) {
  const [inputValue, setInputValue] = useControllableState<string>({
    defaultValue: props.defaultInputValue ?? "",
    value: props.inputValue,
    onChange: props.onInputChange,
  })
  const { contains } = useFilter({ sensitivity: "base" })

  const fieldRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const list = useListData({
    initialItems: Array.from(props.items ?? props.defaultItems ?? []),
    initialSelectedKeys: props.defaultSelectedKeys,
    getKey: (item) => item.key,
  })

  const filteredItems = useMemo(() => {
    const selectedKeys = list.selectedKeys
    if (selectedKeys === "all") {
      return hideSelectedItems ? [] : list.items
    }
    const filterFn = defaultFilter ?? contains
    return list.items.filter((item) => {
      if (hideSelectedItems && selectedKeys.has(item.key)) {
        return false
      }
      return filterFn(item.textValue, inputValue)
    })
  }, [
    contains,
    defaultFilter,
    hideSelectedItems,
    inputValue,
    list.items,
    list.selectedKeys,
  ])

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: [...list.selectedKeys],
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            list.setSelectedKeys(new Set(newSelectedItems))
            break
          default:
            break
        }
      },
    })

  // Make menu width match field group
  const [menuWidth, setMenuWidth] = useState<string | null>(null)
  const onResize = useCallback(() => {
    if (fieldRef.current) {
      const fieldRect = fieldRef.current.getBoundingClientRect()
      setMenuWidth(fieldRect.right - fieldRect.left + "px")
    }
  }, [])

  useResizeObserver({
    ref: fieldRef,
    onResize,
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
    items: filteredItems,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue,
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            list.setSelectedKeys(
              new Set([...list.selectedKeys, newSelectedItem.key]),
            )
          }
          setInputValue("")
          break
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue ?? "")
          break
        default:
          break
      }
    },
  })

  const state: TagFieldState = useMemo(() => {
    return {
      inputValue,
      isOpen,
      getItemProps,
      highlightedIndex,
      getSelectedItemProps,
      removeSelectedItem,
      selectedKeys: list.selectedKeys,
    }
  }, [
    getItemProps,
    getSelectedItemProps,
    highlightedIndex,
    inputValue,
    isOpen,
    list.selectedKeys,
    removeSelectedItem,
  ])

  const layout = useMemo(() => {
    return new UNSTABLE_ListLayout({
      estimatedRowHeight: 48,
    })
  }, [])

  return (
    <Provider
      values={[
        [TagFieldStateContext, state],
        [LabelContext, getLabelProps({ ref: labelRef })],
        [
          TagFieldListContext,
          {
            ...getMenuProps({ ref: listBoxRef }, { suppressRefError: true }),
            isOpen,
            items: filteredItems,
          },
        ],
        [
          TagFieldTriggerContext,
          { ...getToggleButtonProps({ ref: buttonRef }) },
        ],
        [
          PopoverContext,
          {
            ref: popoverRef,
            triggerRef: fieldRef,
            scrollRef: listBoxRef,
            placement: "bottom start",
            isOpen,
            isNonModal: true,
            trigger: "TagField",
            style: { "--trigger-width": menuWidth } as React.CSSProperties,
          },
        ],
        [
          InputContext,
          getInputProps({
            ...getDropdownProps({ preventKeyAction: isOpen, ref: inputRef }),
            // Somehow adding this will allow the input to be updated properly, else
            // it may sometimes lag behind a single state.
            // Was also in the previous downshift docs but they removed it for some reason.
            // See https://github.com/downshift-js/downshift/pull/1576/files#diff-d32b6994832dda99d96f207e964a0ef27102128c532ea9492949f21ec0cf58d3
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value),
          }),
        ],
        [
          GroupContext,
          {
            isDisabled: props.isDisabled || false,
            ref: fieldRef,
          },
        ],
      ]}
    >
      {typeof children === "function"
        ? children({
            isOpen,
            isDisabled: props.isDisabled,
            isInvalid: props.isInvalid,
            isRequired: props.isRequired,
            defaultChildren: null,
            items: filteredItems,
            highlightedIndex,
            getSelectedItemProps,
            removeSelectedItem,
            selectedItems: [...list.selectedKeys],
          })
        : children}
    </Provider>
  )
}

interface TagFieldListItemProps {
  item: TagFieldItem
  index: number
}

const TagFieldListItem = forwardRef<"li", TagFieldListItemProps>(
  ({ item, index, ...props }, ref) => {
    const { getItemProps, highlightedIndex } = useContext(TagFieldStateContext)!
    return (
      <li
        ref={ref}
        className={cn(
          highlightedIndex === index && "bg-blue-300",
          "flex flex-col px-3 py-2 shadow-sm",
        )}
        key={item.key}
        {...getItemProps({ item, index })}
        {...props}
      >
        <span>{item.textValue}</span>
      </li>
    )
  },
)
