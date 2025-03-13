import {
  composeRenderProps,
  selectItemStyles,
  SelectItemVariantProps,
  SelectItemVariantSlots,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { CheckIcon } from "lucide-react"
import { ListBoxItem, ListBoxItemProps } from "react-aria-components"

import { mapPropsVariants } from "../system/utils"

interface SelectItemProps extends ListBoxItemProps, SelectItemVariantProps {
  classNames?: SlotsToClasses<SelectItemVariantSlots>
  children: string
}

export function SelectItem({ classNames, ...originalProps }: SelectItemProps) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    selectItemStyles.variantKeys,
  )
  const styles = selectItemStyles(variantProps)

  return (
    <ListBoxItem
      {...props}
      textValue={props.children}
      className={composeRenderProps(
        props.className ?? classNames?.base,
        (className, renderProps) => styles.base({ className, ...renderProps }),
      )}
    >
      {(renderProps) => (
        <>
          <span
            className={styles.text({
              className: classNames?.text,
              ...renderProps,
            })}
          >
            {props.children}
          </span>
          <span
            className={styles.icon({
              className: classNames?.icon,
              ...renderProps,
            })}
          >
            {renderProps.isSelected && <CheckIcon />}
          </span>
        </>
      )}
    </ListBoxItem>
  )
}
