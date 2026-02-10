import type {
  SearchFieldProps as AriaSearchFieldProps,
  ValidationResult,
} from "react-aria-components"
import { SearchIcon, XIcon } from "lucide-react"
import { useLocalizedStringFormatter } from "react-aria"
import { SearchField as AriaSearchField } from "react-aria-components"

import type {
  SearchFieldSlots,
  SearchFieldVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { composeRenderProps, searchFieldStyles } from "@opengovsg/oui-theme"

import type { InputProps } from "../input"
import { Button } from "../button"
import { Description, FieldError, FieldGroup, Label } from "../field"
import { Input } from "../input"
import { mapPropsVariants } from "../system/utils"
import { i18nStrings } from "./i18n"

export interface SearchFieldProps
  extends AriaSearchFieldProps,
    SearchFieldVariantProps {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?:
    | React.ReactNode
    | ((validation: ValidationResult) => React.ReactNode)
  inputProps?: Partial<InputProps>
  classNames?: SlotsToClasses<SearchFieldSlots>
}

export function SearchField(originalProps: SearchFieldProps) {
  const [
    { label, description, errorMessage, inputProps, classNames, ...props },
    variantProps,
  ] = mapPropsVariants(originalProps, searchFieldStyles.variantKeys)

  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

  const styles = searchFieldStyles(variantProps)

  return (
    <AriaSearchField
      aria-label={stringFormatter.format("Search")}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles.base({
          className,
          ...renderProps,
        }),
      )}
    >
      {label && (
        <Label
          size={variantProps.size}
          className={styles.label({ className: classNames?.label })}
        >
          {label}
        </Label>
      )}
      <FieldGroup className={styles.group({ className: classNames?.group })}>
        <SearchIcon
          aria-hidden
          className={styles.searchIcon({ className: classNames?.searchIcon })}
        />
        <Input
          size={variantProps.size}
          variant="unstyled"
          className={styles.input({ className: classNames?.input })}
          {...inputProps}
        />
        <Button
          isIconOnly
          isAttached
          variant="clear"
          color="sub"
          size={variantProps.size}
          className={styles.clearButton({ className: classNames?.clearButton })}
        >
          <XIcon aria-hidden />
        </Button>
      </FieldGroup>
      {description && (
        <Description size={variantProps.size}>{description}</Description>
      )}
      <FieldError size={variantProps.size}>{errorMessage}</FieldError>
    </AriaSearchField>
  )
}
