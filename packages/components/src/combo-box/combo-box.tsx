"use client"

import React, { JSX, useMemo } from "react"
import {
  cn,
  ComboBoxItemSlots,
  comboBoxItemStyles,
  ComboBoxItemVariantProps,
  ComboBoxSlots,
  comboBoxStyles,
  ComboBoxVariantProps,
  composeRenderProps,
  composeTailwindRenderProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  ComboBox as AriaComboBox,
  ComboBoxProps as AriaComboBoxProps,
  Button,
  Input,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  ListBoxItemRenderProps,
  ListBoxProps,
  ListLayoutOptions,
  Popover,
  Text,
  UNSTABLE_ListLayout,
  UNSTABLE_Virtualizer,
  ValidationResult,
} from "react-aria-components"

import { FieldError, FieldGroup, Label } from "../field"

export type ComboBoxItem = {
  value: string
  name: string
  description?: string
}

export interface ComboBoxProps<T extends ComboBoxItem = ComboBoxItem>
  extends ComboBoxVariantProps,
    Omit<AriaComboBoxProps<T>, "children"> {
  label?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  items: T[]
  classNames?: SlotsToClasses<ComboBoxSlots>
  itemClassNames?: SlotsToClasses<ComboBoxItemSlots>
  /**
   * Any additional props to be spread to the list layout.
   */
  listLayoutOptions?: ListLayoutOptions

  children?: (item: T) => JSX.Element

  /** Values that should invalidate the item cache when using dynamic collections. */
  dependencies?: ListBoxProps<T>["dependencies"]
}

const calculateEstimatedRowHeight = (
  size: NonNullable<ComboBoxVariantProps["size"]>,
): number => {
  switch (size) {
    case "xs":
      return 48
    case "sm":
      return 48
    case "md":
      return 48
    case "lg":
      return 48
  }
}

export function ComboBox<T extends ComboBoxItem>({
  label,
  description,
  errorMessage,
  classNames,
  itemClassNames,
  size,
  listLayoutOptions,
  children,
  dependencies,
  ...props
}: ComboBoxProps<T>) {
  const styles = comboBoxStyles({ size })
  const layout = useMemo(() => {
    return new UNSTABLE_ListLayout({
      estimatedRowHeight: calculateEstimatedRowHeight(size ?? "md"),
      ...listLayoutOptions,
    })
  }, [listLayoutOptions, size])

  return (
    <AriaComboBox
      className={composeTailwindRenderProps(
        props.className ?? classNames?.base,
        styles.container(),
      )}
      {...props}
    >
      {({ isOpen }) => (
        <>
          <Label>{label}</Label>
          <FieldGroup
            className={composeRenderProps(
              classNames?.group,
              (className, renderProps) =>
                styles.group({ ...renderProps, className }),
            )}
          >
            <Input
              className={composeRenderProps(
                classNames?.field,
                (className, renderProps) =>
                  styles.field({ ...renderProps, className }),
              )}
            />
            <Button
              aria-label={isOpen ? "open popover" : "close popover"}
              className={composeRenderProps(
                classNames?.expandButton,
                (className, renderProps) =>
                  styles.expandButton({ ...renderProps, className }),
              )}
            >
              {isOpen ? (
                <ChevronUp
                  className={cn(classNames?.expandIcon, styles.expandIcon())}
                />
              ) : (
                <ChevronDown
                  className={cn(classNames?.expandIcon, styles.expandIcon())}
                />
              )}
            </Button>
          </FieldGroup>
          {description && <Text slot="description">{description}</Text>}
          <FieldError>{errorMessage}</FieldError>
          <UNSTABLE_Virtualizer layout={layout}>
            <Popover
              className={composeRenderProps(
                classNames?.popover,
                (className, renderProps) =>
                  styles.popover({ ...renderProps, className }),
              )}
            >
              <ListBox
                className={composeRenderProps(
                  classNames?.list,
                  (className, renderProps) =>
                    styles.list({ ...renderProps, className }),
                )}
                dependencies={dependencies}
              >
                {/* {children} */}
                {(item: T) => {
                  if (children) {
                    return children(item)
                  }
                  return (
                    <ComboBoxItem
                      size={size}
                      id={item.value}
                      label={item.name}
                      textValue={item.name}
                      description={item.description}
                      classNames={itemClassNames}
                    />
                  )
                }}
              </ListBox>
            </Popover>
          </UNSTABLE_Virtualizer>
        </>
      )}
    </AriaComboBox>
  )
}

export interface ComboBoxItemProps
  extends ListBoxItemProps,
    ComboBoxItemVariantProps {
  label: React.ReactNode | ((props: ListBoxItemRenderProps) => React.ReactNode)
  /**
   * Description for the item, if any
   */
  description?:
    | React.ReactNode
    | ((props: ListBoxItemRenderProps) => React.ReactNode)
  classNames?: SlotsToClasses<ComboBoxItemSlots>
}

export function ComboBoxItem({
  className,
  size,
  description,
  label,
  classNames,
  ...props
}: ComboBoxItemProps) {
  const styles = comboBoxItemStyles({ size })
  return (
    <ListBoxItem
      {...props}
      className={composeRenderProps(
        className ?? classNames?.container,
        (className, renderProps) =>
          styles.container({ ...renderProps, className }),
      )}
    >
      {(renderProps) => {
        return (
          <>
            <Text
              className={cn(styles.label(), classNames?.label)}
              slot="label"
            >
              {typeof label === "function" ? label(renderProps) : label}
            </Text>
            {description && (
              <Text
                className={cn(styles.description(), classNames?.description)}
                slot="description"
              >
                {typeof description === "function"
                  ? description(renderProps)
                  : description}
              </Text>
            )}
          </>
        )
      }}
    </ListBoxItem>
  )
}
