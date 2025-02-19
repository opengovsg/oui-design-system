import { useMemo } from "react"
import {
  cn,
  ComboBoxSlots,
  comboBoxStyles,
  composeRenderProps,
  composeTailwindRenderProps,
  SlotsToClasses,
  VariantProps,
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
  Popover,
  Text,
  UNSTABLE_ListLayout,
  UNSTABLE_Virtualizer,
  ValidationResult,
} from "react-aria-components"

import { FieldError, FieldGroup, Label } from "../field"

export interface ComboBoxProps<
  T extends { value: string; name: string } = { value: string; name: string },
> extends VariantProps<typeof comboBoxStyles>,
    Omit<AriaComboBoxProps<T>, "children"> {
  label?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  items: T[]
  classNames?: SlotsToClasses<ComboBoxSlots>
}

export function ComboBox<T extends { value: string; name: string }>({
  label,
  description,
  errorMessage,
  items,
  classNames,
  size,
  ...props
}: ComboBoxProps<T>) {
  const styles = comboBoxStyles({ size })
  const layout = useMemo(() => {
    return new UNSTABLE_ListLayout({
      rowHeight: 25,
    })
  }, [])

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
            <Popover className="w-(--trigger-width)">
              {({ trigger }) => {
                console.log("trigger", trigger)
                return (
                  <ListBox
                    className={cn(
                      "block max-h-[300px] min-h-[100px] w-[250px] overflow-y-auto",
                      trigger === "ComboBox" && "w-[unset]",
                    )}
                    items={items}
                  >
                    {(item) => (
                      <ComboBoxItem id={item.value}>{item.name}</ComboBoxItem>
                    )}
                  </ListBox>
                )
              }}
            </Popover>
          </UNSTABLE_Virtualizer>
        </>
      )}
    </AriaComboBox>
  )
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        cn(isFocused && "bg-gray-200", isSelected && "bg-gray-300")
      }
    />
  )
}
