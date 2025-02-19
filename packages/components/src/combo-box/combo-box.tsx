"use client"

import { JSX, useMemo } from "react"
import {
  cn,
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
  ListLayoutOptions,
  Popover,
  Text,
  UNSTABLE_ListLayout,
  UNSTABLE_Virtualizer,
  ValidationResult,
} from "react-aria-components"

import { FieldError, FieldGroup, Label } from "../field"

export interface ComboBoxProps<
  T extends { value: string; name: string } = { value: string; name: string },
> extends ComboBoxVariantProps,
    Omit<AriaComboBoxProps<T>, "children"> {
  label?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  items: T[]
  classNames?: SlotsToClasses<ComboBoxSlots>
  /**
   * Any additional props to be spread to the list layout.
   */
  listLayoutOptions?: ListLayoutOptions

  children?: (item: T) => JSX.Element
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

export function ComboBox<T extends { value: string; name: string }>({
  label,
  description,
  errorMessage,
  items,
  classNames,
  size,
  listLayoutOptions,
  children,
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
                items={items}
              >
                {(item) => {
                  if (children) {
                    return children(item)
                  }
                  return (
                    <ComboBoxItem size={size} id={item.value}>
                      {item.name}
                    </ComboBoxItem>
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
    ComboBoxItemVariantProps {}

export function ComboBoxItem({ className, size, ...props }: ComboBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        comboBoxItemStyles({ ...renderProps, className, size }),
      )}
    />
  )
}
