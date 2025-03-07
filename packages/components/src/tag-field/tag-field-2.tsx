// Expected API of the component
// const Template: Story = () => {
//   const items: TagFieldItem[] = []
//   const [fieldState, setFieldState] = useState<FieldState>({
//     selectedKeys: new Set(),
//     inputValue: "",
//     items,
//   })

//   const { startsWith } = useFilter({ sensitivity: "base" })

//   const onSelectionChange = (keys: Set<React.Key>) => {
//     setFieldState({
//       inputValue: "",
//       selectedKeys: keys,
//       items: items.filter((item) => keys.has(item.key)),
//     })
//   }

//   // Specify how each of the Autocomplete values should change when the input
//   // field is altered by the user
//   const onInputChange = (value: string) => {
//     setFieldState((prevState) => ({
//       inputValue: value,
//       selectedKeys: prevState.selectedKeys,
//       items: items.filter((item) => startsWith(item.textValue, value)),
//     }))
//   }

//   return (
//     <TagField
//       inputValue={fieldState.inputValue}
//       items={fieldState.items}
//       selectedKeys={fieldState.selectedKeys}
//       onInputChange={onInputChange}
//       onSelectionChange={onSelectionChange}
//     >
//       {(item) => <TagFieldItem key={item.key} item={item} />}
//     </TagField>
//   )
// }

import {
  createContext,
  ForwardedRef,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react"
import { cn } from "@opengovsg/oui-theme"
import { useResizeObserver } from "@react-aria/utils"
import {
  UseComboboxPropGetters,
  UseComboboxReturnValue,
  UseMultipleSelectionReturnValue,
} from "downshift"
import { get } from "lodash-es"
import { AriaComboBoxProps, Key, useFilter } from "react-aria"
import {
  ComboBoxRenderProps,
  ContextValue,
  FormContext,
  GroupContext,
  InputContext,
  LabelContext,
  Popover,
  PopoverContext,
  Provider,
  SlotProps,
  useContextProps,
  useSlottedContext,
} from "react-aria-components"

import { FieldGroup, Label } from "../field"
import { Input } from "../input"
import { RenderProps } from "../system/types"
import { forwardRef, forwardRefGeneric } from "../system/utils"
import { TagFieldProps } from "./types"
import { TagFieldAria, useTagField } from "./use-tag-field"
import { useTagFieldState } from "./use-tag-field-state"

export type TagFieldItem = {
  textValue: string
  id: Key
  description?: string
}

interface TagFieldRenderProps<T extends object>
  extends ComboBoxRenderProps,
    Pick<
      UseMultipleSelectionReturnValue<T>,
      "getSelectedItemProps" | "removeSelectedItem"
    > {
  highlightedIndex?: number
  selectedItems: T[]
  items?: T[]
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

// const TagFieldChip = forwardRef<"span", TagFieldChipProps>(
//   ({ item, index }, ref) => {
//     return (
//       <span
//         className="rounded-md bg-gray-100 px-1 focus:bg-red-400"
//         key={`selected-item-${index}`}
//       >
//         {selectedItemForRender.toString()}
//         <span
//           className="cursor-pointer px-1"
//           onClick={(e) => {
//             e.stopPropagation()
//             removeSelectedItem(selectedItemForRender)
//           }}
//         >
//           &#10005;
//         </span>
//       </span>
//     )
//   },
// )

interface TagFieldProps2<T> {
  items?: T[]
  defaultItems?: T[]
  selectedKeys?: Set<Key>
  defaultSelectedKeys?: Set<Key>
  onSelectionChange?: (keys: Set<Key>) => void
  onInputChange?: (value: string) => void
}

export function TagField<T extends object>(props: TagFieldProps2<T>) {
  return (
    <TagFieldRoot
      defaultItems={[...Array(100)].map((_, i) => ({
        id: String(i),
        textValue: `Item ${i}`,
      }))}
    >
      {({ selectedItems, getSelectedItemProps, removeSelectedItem }) => (
        <>
          <Label>hehe</Label>
          <FieldGroup className="flex-wrap gap-1">
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
                  {selectedItem.textValue}
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
            <Input className="min-w-[56px]" />
            <TagFieldTrigger>&#8595;</TagFieldTrigger>
          </FieldGroup>
          <Popover>
            <TagFieldList<T>>
              {({ item, index }) => (
                <TagFieldListItem item={item} index={index} key={item.id} />
              )}
            </TagFieldList>
          </Popover>
        </>
      )}
    </TagFieldRoot>
  )
}

interface TagFieldState<T extends object>
  extends Pick<UseComboboxReturnValue<T>, "getItemProps">,
    Pick<
      UseMultipleSelectionReturnValue<T>,
      "getSelectedItemProps" | "removeSelectedItem"
    > {
  inputValue: string
  isOpen: boolean
  highlightedIndex: number
  selectedItems: T[]
}

interface TagFieldTriggerProps extends SlotProps {}
interface TagFieldTriggerContextValue
  extends TagFieldTriggerProps,
    ReturnType<UseComboboxPropGetters<object>["getToggleButtonProps"]> {}

interface TagFieldListRenderProps<T> {
  item: T
  index: number
}

interface TagFieldListProps<T extends object>
  extends Partial<TagFieldListContextValue<T>> {
  className?: string
  children?: ReactNode | ((values: TagFieldListRenderProps<T>) => ReactNode)
}
interface TagFieldListContextValue<T>
  extends SlotProps,
    ReturnType<UseComboboxPropGetters<object>["getMenuProps"]> {
  items: T[]
  isOpen: boolean
}

export const TagFieldContext =
  createContext<ContextValue<TagFieldProps<any>, HTMLDivElement>>(null)
export const TagFieldStateContext = createContext<TagFieldState<any> | null>(
  null,
)
export const TagFieldTriggerContext = createContext<
  ContextValue<TagFieldTriggerContextValue, HTMLButtonElement>
>({})
export const TagFieldListContext =
  createContext<ContextValue<TagFieldListContextValue<any>, HTMLUListElement>>(
    null,
  )

type TagFieldListItemContextValue<T extends object> = Required<
  Pick<TagFieldProps<T>, "itemToKey" | "itemToText">
> &
  TagFieldAria<T>["listItemProps"]

export const TagFieldListItemContext =
  createContext<TagFieldListItemContextValue<any> | null>(null)

interface TagFieldRootProps<T extends TagFieldItem>
  extends Omit<TagFieldProps<T>, "children">,
    RenderProps<TagFieldRenderProps<T>> {}

const TagFieldListInner = <T extends object>(
  props: TagFieldListProps<T>,
  ref: ForwardedRef<HTMLUListElement>,
) => {
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
            item: item,
            index,
          })
        }
        return props.children
      })}
    </ul>
  )
}
const TagFieldList = forwardRefGeneric(TagFieldListInner)

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
  children,
  ...props
}: TagFieldRootProps<T>) {
  const { itemToKey: defaultItemToKey, itemToText: defaultItemToText } = props
  const { contains } = useFilter({ sensitivity: "base" })
  const itemToText = useCallback(
    (item: T) => {
      if (defaultItemToText) return defaultItemToText(item)
      return String(get(item, "textValue") ?? String(item))
    },
    [defaultItemToText],
  )

  const itemToKey = useCallback(
    (item: T) => {
      if (defaultItemToKey) return defaultItemToKey(item)
      return String(get(item, "id") ?? String(item))
    },
    [defaultItemToKey],
  )

  const onSelectionChange = useCallback(
    (nextItems: T[]) => {
      if (props.onSelectionChange) {
        props.onSelectionChange(new Set(nextItems.map(itemToKey)))
      }
    },
    [props, itemToKey],
  )
  const state = useTagFieldState({
    ...props,
    itemToKey,
    itemToText,
    onSelectionChange,
    defaultFilter: props.defaultFilter || contains,
  })

  // const selectedKeys = useMemo(
  //   () => new Set(selectedItems.map((item) => item.key)),
  //   [selectedItems],
  // )

  const { validationBehavior: formValidationBehavior } =
    useSlottedContext(FormContext) || {}
  const validationBehavior =
    props.validationBehavior ?? formValidationBehavior ?? "native"

  const fieldRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const {
    buttonProps,
    inputProps,
    labelProps,
    listBoxProps,
    listItemProps,
    descriptionProps,
    errorMessageProps,
    chipsProps,
    isOpen,
    ...validation
  } = useTagField(
    {
      itemToKey,
      itemToText,
      inputRef,
      fieldRef,
      listBoxRef,
      labelRef,
      popoverRef,
      buttonRef,
      validationBehavior,
    },
    state,
  )

  // const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
  //   useMultipleSelection({
  //     selectedItems,
  //     onStateChange({ selectedItems: newSelectedItems, type }) {
  //       switch (type) {
  //         case useMultipleSelection.stateChangeTypes
  //           .SelectedItemKeyDownBackspace:
  //         case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
  //         case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
  //         case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
  //           setSelectedItems(newSelectedItems ?? [])
  //           break
  //         default:
  //           break
  //       }
  //     },
  //   })

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

  // const {
  //   isOpen,
  //   getToggleButtonProps,
  //   getLabelProps,
  //   getMenuProps,
  //   getInputProps,
  //   highlightedIndex,
  //   getItemProps,
  // } = useCombobox({
  //   items,
  //   defaultHighlightedIndex: 0, // after selection, highlight the first item.
  //   selectedItem: null,
  //   inputValue,
  //   onStateChange({
  //     inputValue: newInputValue,
  //     type,
  //     selectedItem: newSelectedItem,
  //   }) {
  //     switch (type) {
  //       case useCombobox.stateChangeTypes.InputKeyDownEnter:
  //       case useCombobox.stateChangeTypes.ItemClick:
  //       case useCombobox.stateChangeTypes.InputBlur:
  //         if (newSelectedItem) {
  //           setSelectedItems((prev) => [...prev, newSelectedItem])
  //         }
  //         setInputValue("")
  //         break
  //       case useCombobox.stateChangeTypes.InputChange:
  //         setInputValue(newInputValue ?? "")
  //         break
  //       default:
  //         break
  //     }
  //   },
  // })

  // const state: TagFieldState = useMemo(() => {
  //   return {
  //     inputValue,
  //     isOpen,
  //     getItemProps,
  //     highlightedIndex,
  //     getSelectedItemProps,
  //     removeSelectedItem,
  //     selectedItems,
  //   }
  // }, [
  //   getItemProps,
  //   getSelectedItemProps,
  //   highlightedIndex,
  //   inputValue,
  //   isOpen,
  //   selectedKeys,
  //   removeSelectedItem,
  // ])

  // const layout = useMemo(() => {
  //   return new UNSTABLE_ListLayout({
  //     estimatedRowHeight: 48,
  //   })
  // }, [])

  return (
    <Provider
      values={[
        [TagFieldStateContext, state],
        [LabelContext, labelProps],
        [TagFieldListContext, listBoxProps],
        [TagFieldTriggerContext, buttonProps],
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
        [TagFieldListItemContext, { ...listItemProps, itemToKey, itemToText }],
        [InputContext, inputProps],
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
            items: state.items,
            highlightedIndex: listItemProps.highlightedIndex,
            getSelectedItemProps: chipsProps.getSelectedItemProps,
            removeSelectedItem: chipsProps.removeSelectedItem,
            selectedItems: state.selectedItems,
          })
        : children}
    </Provider>
  )
}

interface TagFieldListItemProps<T extends object> {
  item: T
  index: number
}

const TagFieldListItemInner = <T extends object>(
  { item, index, ...props }: TagFieldListItemProps<T>,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const { getItemProps, highlightedIndex, itemToKey, itemToText } = useContext(
    TagFieldListItemContext,
  )!

  return (
    <li
      ref={ref}
      className={cn(
        highlightedIndex === index && "bg-blue-300",
        "flex flex-col px-3 py-2 shadow-sm",
      )}
      key={itemToKey(item)}
      {...getItemProps({ item, index })}
      {...props}
    >
      <span>{itemToText(item)}</span>
    </li>
  )
}
const TagFieldListItem = forwardRefGeneric(TagFieldListItemInner)
