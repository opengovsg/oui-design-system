import { useMemo } from "react"
import { cn, comboBoxStyles, VariantProps } from "@opengovsg/oui-theme"
import { Button } from "@opengovsg/oui/button"
import {
  ComboBox as AriaComboBox,
  ComboBoxProps as AriaComboBoxProps,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
  Text,
  UNSTABLE_ListLayout,
  UNSTABLE_Virtualizer,
  ValidationResult,
} from "react-aria-components"

export interface ComboBoxProps<
  T extends { value: string; name: string } = { value: string; name: string },
> extends VariantProps<typeof comboBoxStyles>,
    Omit<AriaComboBoxProps<T>, "children"> {
  label?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  items: T[]
}

export function ComboBox<T extends { value: string; name: string }>({
  label,
  description,
  errorMessage,
  items,
  ...props
}: ComboBoxProps<T>) {
  const layout = useMemo(() => {
    return new UNSTABLE_ListLayout({
      rowHeight: 25,
    })
  }, [])

  return (
    <AriaComboBox {...props}>
      {({ isOpen }) => (
        <>
          <Label>{label}</Label>
          <div className="my-combobox-container">
            <Input />
            <Button>{isOpen ? "▲" : "▼"}</Button>
          </div>
          {description && <Text slot="description">{description}</Text>}
          <FieldError>{errorMessage}</FieldError>
          <UNSTABLE_Virtualizer layout={layout}>
            <Popover className="w-[var(--trigger-width)]">
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
