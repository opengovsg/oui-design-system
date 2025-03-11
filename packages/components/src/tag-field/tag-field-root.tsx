import type { UseMultipleSelectionReturnValue } from "downshift"
import { useCallback, useMemo, useRef, useState } from "react"
import { TagFieldVariantProps } from "@opengovsg/oui-theme"
import { useResizeObserver } from "@react-aria/utils"
import { get } from "lodash-es"
import { useFilter } from "react-aria"
import {
  ComboBoxRenderProps,
  FieldErrorContext,
  FormContext,
  GroupContext,
  InputContext,
  LabelContext,
  PopoverContext,
  Provider,
  TextContext,
  useSlottedContext,
} from "react-aria-components"

import { RenderProps } from "../system/types"
import { removeDataAttributes } from "../system/utils"
import { TagFieldListContext } from "./tag-field-list"
import { TagFieldStateContext } from "./tag-field-state-context"
import { TagFieldTriggerContext } from "./tag-field-trigger"
import { TagFieldItem, TagFieldProps } from "./types"
import { useTagField } from "./use-tag-field"
import { useTagFieldState } from "./use-tag-field-state"

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

const calculateEstimatedRowHeight = (
  size: NonNullable<TagFieldVariantProps["size"]>,
): number => {
  switch (size) {
    case "md":
      return 48
  }
}

export interface TagFieldRootProps<T extends TagFieldItem>
  extends Omit<TagFieldProps<T>, "children">,
    RenderProps<TagFieldRootRenderProps<T>> {}

export function TagFieldRoot<T extends TagFieldItem>({
  children,
  virtualRowHeight: _virtualRowHeight,
  ...props
}: TagFieldRootProps<T>) {
  const { itemToKey: defaultItemToKey, itemToText: defaultItemToText } = props
  const virtualRowHeight = useMemo(
    () => _virtualRowHeight ?? calculateEstimatedRowHeight(props.size ?? "md"),
    [_virtualRowHeight, props.size],
  )
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
      virtualRowHeight,
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
        [
          TagFieldStateContext,
          {
            ...state,
            ...tagFieldProps,
            size: props.size,
            variant: props.variant,
          },
        ],
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
