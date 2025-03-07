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
  useMemo,
  useRef,
  useState,
} from "react"
import { cn } from "@opengovsg/oui-theme"
import { useResizeObserver } from "@react-aria/utils"
import {
  useVirtualizer,
  VirtualItem,
  Virtualizer,
} from "@tanstack/react-virtual"
import {
  UseComboboxPropGetters,
  UseMultipleSelectionReturnValue,
} from "downshift"
import { get } from "lodash-es"
import { AriaListBoxOptions, Key, useFilter } from "react-aria"
import {
  ComboBoxRenderProps,
  ContextValue,
  FieldErrorContext,
  FormContext,
  GroupContext,
  InputContext,
  LabelContext,
  Popover,
  PopoverContext,
  Provider,
  SlotProps,
  TextContext,
  useContextProps,
  useSlottedContext,
} from "react-aria-components"

import { Description, FieldError, FieldGroup, Label } from "../field"
import { Input } from "../input"
import { RenderProps } from "../system/types"
import {
  forwardRef,
  forwardRefGeneric,
  removeDataAttributes,
} from "../system/utils"
import { TagFieldProps } from "./types"
import { TagFieldAria, useTagField } from "./use-tag-field"
import { TagFieldState, useTagFieldState } from "./use-tag-field-state"

export type TagFieldItem = {
  textValue: string
  id: Key
  description?: string
}

interface TagFieldRenderProps<T extends TagFieldItem>
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

export function TagField<T extends TagFieldItem>(props: TagFieldProps<T>) {
  return (
    <TagFieldRoot {...props}>
      {({ selectedItems, getSelectedItemProps, removeSelectedItem }) => (
        <>
          <Label>{props.label}</Label>
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
          {props.description && <Description>{props.description}</Description>}
          <FieldError>{props.errorMessage}</FieldError>
          <Popover>
            <TagFieldList<T>>
              {({ item, index, key, style }) => {
                return (
                  <TagFieldListItem
                    item={item}
                    index={index}
                    key={key}
                    style={style}
                  />
                )
              }}
            </TagFieldList>
          </Popover>
        </>
      )}
    </TagFieldRoot>
  )
}

interface TagFieldTriggerProps extends SlotProps {}
interface TagFieldTriggerContextValue
  extends TagFieldTriggerProps,
    ReturnType<UseComboboxPropGetters<object>["getToggleButtonProps"]> {}

interface TagFieldListRenderProps<T> {
  item: T
  index: number
  key: VirtualItem["key"]
  style: React.CSSProperties
}

interface TagFieldListProps<T extends TagFieldItem>
  extends Partial<TagFieldListContextValue> {
  className?: string
  children?: ReactNode | ((values: TagFieldListRenderProps<T>) => ReactNode)
}

export const TagFieldStateContext = createContext<
  (TagFieldState<any> & { isOpen: boolean }) | null
>(null)
export const TagFieldTriggerContext = createContext<
  ContextValue<TagFieldTriggerContextValue, HTMLButtonElement>
>({})

interface TagFieldListContextValue
  extends SlotProps,
    ReturnType<UseComboboxPropGetters<object>["getMenuProps"]> {
  rowVirtualizer: Virtualizer<HTMLElement, Element>
}
export const TagFieldListContext =
  createContext<ContextValue<TagFieldListContextValue, HTMLUListElement>>(null)

type TagFieldListItemContextValue<T extends TagFieldItem> =
  TagFieldAria<T>["listItemProps"]

export const TagFieldListItemContext =
  createContext<TagFieldListItemContextValue<any> | null>(null)

interface TagFieldRootProps<T extends TagFieldItem>
  extends Omit<TagFieldProps<T>, "children">,
    RenderProps<TagFieldRenderProps<T>> {}

const TagFieldListInner = <T extends TagFieldItem>(
  props: TagFieldListProps<T>,
  ref: ForwardedRef<HTMLUListElement>,
) => {
  ;[props, ref] = useContextProps(props, ref, TagFieldListContext)
  const { items } = useContext(TagFieldStateContext)!

  const { slot, className, rowVirtualizer, ...rest } = props

  return (
    <ul
      slot={slot ?? undefined}
      ref={ref}
      {...rest}
      className={cn(
        "w-(--trigger-width) relative z-10 mt-1 max-h-80 overflow-scroll bg-white p-0 shadow-md",
        className,
      )}
    >
      {props.children !== undefined && typeof props.children !== "function" ? (
        props.children
      ) : (
        <>
          <li
            key="total-size"
            style={{ height: rowVirtualizer?.getTotalSize() }}
          />
          {rowVirtualizer?.getVirtualItems().map((virtualRow) => {
            const childProps = {
              item: items[virtualRow.index],
              index: virtualRow.index,
              key: virtualRow.key,
              style: {
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              },
            }
            if (typeof props.children === "function") {
              return props.children(childProps)
            }
            return <TagFieldListItem {...childProps} key={childProps.key} />
          })}
        </>
      )}
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
    rowVirtualizer,
    ...validation
  } = useTagField(
    {
      ...removeDataAttributes(props),
      itemToKey,
      itemToText,
      inputRef,
      listBoxRef,
      labelRef,
      buttonRef,
      validationBehavior,
    },
    state,
  )

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

  // Only expose a subset of state to renderProps function to avoid infinite render loop
  const renderPropsState = useMemo(
    () => ({
      isOpen,
      isDisabled: props.isDisabled || false,
      isInvalid: validation.isInvalid || false,
      isRequired: props.isRequired || false,
    }),
    [isOpen, props.isDisabled, props.isRequired, validation.isInvalid],
  )

  return (
    <Provider
      values={[
        [TagFieldStateContext, { ...state, isOpen }],
        [LabelContext, labelProps],
        [TagFieldListContext, { ...listBoxProps, rowVirtualizer }],
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
        [TagFieldListItemContext, listItemProps],
        [InputContext, inputProps],
        [
          TextContext,
          {
            slots: {
              description: descriptionProps,
              errorMessage: errorMessageProps,
            },
          },
        ],
        [
          GroupContext,
          {
            isDisabled: props.isDisabled || false,
            isInvalid: validation.isInvalid,
            ref: fieldRef,
          },
        ],
        [FieldErrorContext, validation],
      ]}
    >
      {typeof children === "function"
        ? children({
            ...renderPropsState,
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

interface TagFieldListItemProps<T extends TagFieldItem> {
  item: T
  index: number
  className?: string
  style?: React.CSSProperties
}

const TagFieldListItemInner = <T extends TagFieldItem>(
  { item, index, ...props }: TagFieldListItemProps<T>,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const { getItemProps, highlightedIndex } = useContext(
    TagFieldListItemContext,
  )!

  const { itemToKey, itemToText } = useContext(TagFieldStateContext)!

  return (
    <li
      ref={ref}
      key={itemToKey(item)}
      {...getItemProps({ item, index })}
      {...props}
      className={cn(
        highlightedIndex === index && "bg-blue-300",
        "absolute left-0 top-0 flex w-full flex-col px-3 py-2 shadow-sm",
        props.className,
      )}
    >
      <span>{itemToText(item)}</span>
    </li>
  )
}
const TagFieldListItem = forwardRefGeneric(TagFieldListItemInner)
