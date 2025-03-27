"use client"

import type { LocalizedStrings } from "react-aria"
import type {
  ComboBoxProps as AriaComboBoxProps,
  ListBoxProps,
  ListBoxRenderProps,
  ListLayoutOptions,
  ValidationResult,
} from "react-aria-components"
import { useCallback, useMemo } from "react"
import { ChevronDown, ChevronUp, XIcon } from "lucide-react"
import { useMessageFormatter } from "react-aria"
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  Input,
  ListBox,
  ListLayout,
  Provider,
  Virtualizer,
} from "react-aria-components"

import type {
  ComboBoxSlots,
  ComboBoxVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  cn,
  comboBoxClearButtonStyles,
  comboBoxStyles,
  composeRenderProps,
  composeTailwindRenderProps,
  listBoxItemStyles,
} from "@opengovsg/oui-theme"

import { Description, FieldError, FieldGroup, Label } from "../field"
import { Popover } from "../popover"
import { mapPropsVariants } from "../system/utils"
import { ComboBoxVariantContext } from "./combo-box-variant-context"

export interface ComboBoxProps<T extends object>
  extends ComboBoxVariantProps,
    Omit<AriaComboBoxProps<T>, "children"> {
  label?: string
  /** The list of ComboBox items (uncontrolled). */
  defaultItems?: T[]
  /** The list of ComboBox items (controlled). */
  items?: T[]
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  classNames?: SlotsToClasses<ComboBoxSlots> &
    SlotsToClasses<"clearButton" | "emptyState">
  /**
   * Any additional props to be spread to the list layout.
   */
  listLayoutOptions?: ListLayoutOptions

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

  renderEmptyState?: ListBoxProps<T>["renderEmptyState"]

  children?: ListBoxProps<T>["children"]
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
    empty: "No matching results",
  },
  "zh-SG": {
    clear: "清除",
    empty: "没有匹配的结果",
  },
  "ms-SG": {
    clear: "Jelas",
    empty: "Tiada hasil yang sepadan",
  },
  "ta-SG": {
    clear: "தெளிவு",
    empty: "பொருந்தும் முடிவுகள் இல்லை",
  },
}

export function ComboBoxEmptyState({
  size,
  className,
}: Pick<ComboBoxVariantProps, "size"> & { className?: string }) {
  const styles = listBoxItemStyles({ size })
  const formatMessage = useMessageFormatter(i18nStrings)
  return (
    <span
      className={styles.container({
        className: cn("cursor-default italic", className),
      })}
    >
      {formatMessage("empty")}
    </span>
  )
}

export function ComboBox<T extends object>(originalProps: ComboBoxProps<T>) {
  const formatMessage = useMessageFormatter(i18nStrings)
  const [_props, variantProps] = mapPropsVariants(
    originalProps,
    comboBoxStyles.variantKeys,
  )
  const {
    label,
    description,
    errorMessage,
    classNames,
    listLayoutOptions,
    children,
    dependencies,
    onClear,
    renderEmptyState: renderEmptyStateProp,
    ...props
  } = _props

  const styles = comboBoxStyles(variantProps)

  const layout = useMemo(() => {
    return new ListLayout({
      estimatedRowHeight: calculateEstimatedRowHeight(
        variantProps.size ?? "md",
      ),
      ...listLayoutOptions,
    })
  }, [listLayoutOptions, variantProps.size])

  const renderEmptyState = useCallback(
    (props: ListBoxRenderProps) => {
      if (renderEmptyStateProp) {
        return renderEmptyStateProp(props)
      }
      return <ComboBoxEmptyState className={classNames?.emptyState} />
    },
    [classNames?.emptyState, renderEmptyStateProp],
  )

  return (
    <Provider values={[[ComboBoxVariantContext, variantProps]]}>
      <AriaComboBox
        className={composeTailwindRenderProps(
          props.className ?? classNames?.base,
          styles.container(),
        )}
        shouldFocusWrap
        allowsEmptyCollection
        isDisabled={variantProps.isDisabled}
        {...props}
      >
        {({ isOpen, isDisabled: isComboBoxDisabled }) => (
          <>
            <Label
              size={variantProps.size}
              className={styles.label({ className: classNames?.label })}
            >
              {label}
            </Label>
            <div className="flex flex-row">
              <FieldGroup
                isDisabled={isComboBoxDisabled}
                className={composeRenderProps(
                  classNames?.group,
                  (className, renderProps) =>
                    styles.group({
                      ...renderProps,
                      className,
                      isClearable: !!onClear,
                    }),
                )}
              >
                <Input
                  className={composeRenderProps(
                    classNames?.field,
                    (className, renderProps) =>
                      styles.field({ ...renderProps, className }),
                  )}
                />
                <AriaButton
                  className={composeRenderProps(
                    classNames?.expandButton,
                    (className, renderProps) =>
                      styles.expandButton({ ...renderProps, className }),
                  )}
                >
                  {isOpen ? (
                    <ChevronUp
                      className={styles.icon({
                        className: classNames?.icon,
                      })}
                    />
                  ) : (
                    <ChevronDown
                      className={styles.icon({
                        className: classNames?.icon,
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
                        ...variantProps,
                        ...renderProps,
                        className,
                        isInactive: !props.inputValue,
                      }),
                  )}
                >
                  <XIcon
                    className={styles.icon({
                      className: classNames?.icon,
                    })}
                  />
                </AriaButton>
              )}
            </div>
            {description && (
              <Description size={variantProps.size}>{description}</Description>
            )}
            <FieldError size={variantProps.size}>{errorMessage}</FieldError>
            <Popover
              className={composeRenderProps(
                classNames?.popover,
                (className, renderProps) =>
                  styles.popover({ ...renderProps, className }),
              )}
            >
              <Virtualizer layout={layout}>
                <ListBox
                  className={composeRenderProps(
                    classNames?.list,
                    (className, renderProps) =>
                      styles.list({ ...renderProps, className }),
                  )}
                  dependencies={dependencies}
                  renderEmptyState={renderEmptyState}
                >
                  {children}
                </ListBox>
              </Virtualizer>
            </Popover>
          </>
        )}
      </AriaComboBox>
    </Provider>
  )
}
