import type { Virtualizer } from "@tanstack/react-virtual"
import type {
  UseComboboxPropGetters,
  UseComboboxReturnValue,
  UseMultipleSelectionReturnValue,
} from "downshift"
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
import { get } from "lodash-es"
import { Key, useFilter } from "react-aria"
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
import { TagFieldListRenderProps, TagFieldProps } from "./types"
import { useTagField } from "./use-tag-field"
import { TagFieldState, useTagFieldState } from "./use-tag-field-state"

export type TagFieldItem = {
  textValue: string
  id: Key
  description?: string
}

interface TagFieldRootRenderProps<T extends TagFieldItem>
  extends ComboBoxRenderProps,
    Pick<
      UseMultipleSelectionReturnValue<T>,
      "getSelectedItemProps" | "removeSelectedItem"
    > {
  highlightedIndex?: number
  selectedItems: T[]
  items?: T[]
}

interface TagFieldChipListProps<T extends TagFieldItem> {
  className?: string
  children?: ReactNode | ((values: TagFieldChipListRenderProps<T>) => ReactNode)
}

const TagFieldChipList = <T extends TagFieldItem>(
  props: TagFieldChipListProps<T>,
) => {
  const {
    selectedItems,
    getSelectedItemProps,
    removeSelectedItem,
    isDisabled,
    isReadOnly,
  } = useContext(TagFieldStateContext)!

  const handleRemoveSelectedItem = useCallback(
    (item: T) => () => {
      if (isDisabled || isReadOnly) return
      removeSelectedItem(item)
    },
    [isDisabled, isReadOnly, removeSelectedItem],
  )

  if (props.children !== undefined && typeof props.children !== "function") {
    return props.children
  }

  return selectedItems.map((selectedItem, index) => {
    const itemProps = getSelectedItemProps({
      disabled: isDisabled,
      readOnly: isReadOnly,
      selectedItem,
      index,
    })

    if (typeof props.children === "function") {
      return props.children({
        item: selectedItem,
        removeSelectedItem: handleRemoveSelectedItem(selectedItem),
        isDisabled,
        isReadOnly,
        itemProps,
      })
    }

    return (
      <span
        className="rounded-md bg-gray-100 px-1 focus:bg-red-400"
        key={`selected-item-${index}`}
        {...itemProps}
      >
        {selectedItem.textValue}
        <span
          className="cursor-pointer px-1"
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveSelectedItem(selectedItem)()
          }}
        >
          &#10005;
        </span>
      </span>
    )
  })
}

export function TagField<T extends TagFieldItem>(props: TagFieldProps<T>) {
  return (
    <TagFieldRoot {...props}>
      <Label>{props.label}</Label>
      <FieldGroup className="flex-wrap gap-1">
        <TagFieldChipList />
        <Input className="min-w-[56px]" />
        <TagFieldTrigger>&#8595;</TagFieldTrigger>
      </FieldGroup>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
      <Popover>
        <TagFieldList />
      </Popover>
    </TagFieldRoot>
  )
}

type TagFieldTriggerProps = SlotProps
interface TagFieldTriggerContextValue
  extends TagFieldTriggerProps,
    ReturnType<UseComboboxPropGetters<object>["getToggleButtonProps"]> {}

interface TagFieldChipListRenderProps<T> {
  item: T
  itemProps: ReturnType<
    UseMultipleSelectionReturnValue<T>["getSelectedItemProps"]
  >
  removeSelectedItem: () => void
  isDisabled: boolean
  isReadOnly: boolean
}
interface TagFieldListProps<T extends TagFieldItem>
  extends Partial<TagFieldListContextValue> {
  className?: string
  children?: ReactNode | ((values: TagFieldListRenderProps<T>) => ReactNode)
}

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
interface TagFieldRootProps<T extends TagFieldItem>
  extends Omit<TagFieldProps<T>, "children">,
    RenderProps<TagFieldRootRenderProps<T>> {}

const TagFieldListInner = <T extends TagFieldItem>(
  props: TagFieldListProps<T>,
  ref: ForwardedRef<HTMLUListElement>,
) => {
  ;[props, ref] = useContextProps(props, ref, TagFieldListContext)
  const { items, getItemProps, highlightedIndex } =
    useContext(TagFieldStateContext)!

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
            const item = items[virtualRow.index]
            const itemProps = getItemProps({
              item,
              index: virtualRow.index,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              },
            })
            const childProps = {
              item,
              itemProps,
              isHighlighted: highlightedIndex === virtualRow.index,
              key: virtualRow.key,
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
    tagFieldProps,
    buttonProps,
    inputProps,
    labelProps,
    listBoxProps,
    descriptionProps,
    errorMessageProps,
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
      isOpen: tagFieldProps.isOpen,
      isDisabled: props.isDisabled || false,
      isInvalid: validation.isInvalid || false,
      isRequired: props.isRequired || false,
    }),
    [
      tagFieldProps.isOpen,
      props.isDisabled,
      props.isRequired,
      validation.isInvalid,
    ],
  )

  return (
    <Provider
      values={[
        [TagFieldStateContext, { ...state, ...tagFieldProps }],
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
            isOpen: tagFieldProps.isOpen,
            isNonModal: true,
            trigger: "TagField",
            style: { "--trigger-width": menuWidth } as React.CSSProperties,
          },
        ],
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
            selectedItems: state.selectedItems,
            highlightedIndex: tagFieldProps.highlightedIndex,
            getSelectedItemProps: tagFieldProps.getSelectedItemProps,
            removeSelectedItem: tagFieldProps.removeSelectedItem,
          })
        : children}
    </Provider>
  )
}

type TagFieldListItemProps<T extends TagFieldItem> = Omit<
  TagFieldListRenderProps<T>,
  "key"
>

const TagFieldListItemInner = <T extends TagFieldItem>(
  { item, isHighlighted, itemProps }: TagFieldListItemProps<T>,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const { itemToKey, itemToText } = useContext(TagFieldStateContext)!

  return (
    <li
      ref={ref}
      key={itemToKey(item)}
      {...itemProps}
      className={cn(
        isHighlighted && "bg-blue-300",
        "flex flex-col px-3 py-2 shadow-sm",
        itemProps.className,
      )}
    >
      <span>{itemToText(item)}</span>
    </li>
  )
}
const TagFieldListItem = forwardRefGeneric(TagFieldListItemInner)
