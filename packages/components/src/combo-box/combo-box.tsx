"use client"

import React, { JSX, useMemo } from "react"
import {
  comboBoxClearButtonStyles,
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
import { ChevronDown, ChevronUp, XIcon } from "lucide-react"
import { LocalizedStrings, useMessageFormatter } from "react-aria"
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  ComboBoxProps as AriaComboBoxProps,
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

import { Description, FieldError, FieldGroup, Label } from "../field"

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
  classNames?: SlotsToClasses<ComboBoxSlots> & SlotsToClasses<"clearButton">
  itemClassNames?: SlotsToClasses<ComboBoxItemSlots>
  /**
   * Any additional props to be spread to the list layout.
   */
  listLayoutOptions?: ListLayoutOptions

  children?: (item: T) => JSX.Element

  /** Values that should invalidate the item cache when using dynamic collections. */
  dependencies?: ListBoxProps<T>["dependencies"]

  /**
   * If provided, a clear button will be rendered next to the expand button.
   *
   * This callback will be called when the clear button is clicked.
   *
   * To use this, this component must be a controlled component with externally
   * handled `inputValue`, `onInputChange`, `selectedKey` and `onSelectionChange` state.
   */
  onClear?: () => void
}

const calculateEstimatedRowHeight = (
  size: NonNullable<ComboBoxVariantProps["size"]>,
): number => {
  switch (size) {
    case "xs":
      return 44
    case "sm":
      return 44
    case "md":
      return 48
  }
}

const i18nStrings: LocalizedStrings = {
  "en-SG": {
    clear: "Clear",
  },
  "zh-SG": {
    clear: "清除",
  },
  "ms-SG": {
    clear: "Jelas",
  },
  "ta-SG": {
    clear: "தெளிவு",
  },
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
  onClear,
  ...props
}: ComboBoxProps<T>) {
  const formatMessage = useMessageFormatter(i18nStrings)
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
      shouldFocusWrap
      {...props}
    >
      {({ isOpen, isDisabled: isComboBoxDisabled }) => (
        <>
          <Label
            size={size}
            className={styles.label({ className: classNames?.label, size })}
          >
            {label}
          </Label>
          <div className="flex flex-row">
            <FieldGroup
              className={composeRenderProps(
                classNames?.group,
                (className, renderProps) =>
                  styles.group({
                    ...renderProps,
                    className,
                    size,
                    isClearable: !!onClear,
                  }),
              )}
            >
              <Input
                className={composeRenderProps(
                  classNames?.field,
                  (className, renderProps) =>
                    styles.field({ ...renderProps, className, size }),
                )}
              />
              <AriaButton
                className={composeRenderProps(
                  classNames?.expandButton,
                  (className, renderProps) =>
                    styles.expandButton({ ...renderProps, className, size }),
                )}
              >
                {isOpen ? (
                  <ChevronUp
                    className={styles.icon({
                      className: classNames?.icon,
                      size,
                    })}
                  />
                ) : (
                  <ChevronDown
                    className={styles.icon({
                      className: classNames?.icon,
                      size,
                    })}
                  />
                )}
              </AriaButton>
            </FieldGroup>
            {!!onClear && (
              <AriaButton
                slot={null}
                onPress={onClear}
                isDisabled={isComboBoxDisabled}
                aria-label={formatMessage("clear")}
                className={composeRenderProps(
                  classNames?.clearButton,
                  (className, renderProps) =>
                    comboBoxClearButtonStyles({
                      ...renderProps,
                      className,
                      size,
                      isInactive: !props.inputValue,
                      isDisabled: renderProps.isDisabled,
                    }),
                )}
              >
                <XIcon
                  className={styles.icon({
                    className: classNames?.icon,
                    size,
                  })}
                />
              </AriaButton>
            )}
          </div>
          {description && <Description size={size}>{description}</Description>}
          <FieldError size={size}>{errorMessage}</FieldError>
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
              className={styles.label({ className: classNames?.label })}
              slot="label"
            >
              {typeof label === "function" ? label(renderProps) : label}
            </Text>
            {description && (
              <Text
                className={styles.description({
                  className: classNames?.description,
                })}
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
