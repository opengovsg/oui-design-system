import type {
  SearchFieldProps as AriaSearchFieldProps,
  ValidationResult,
} from "react-aria-components"
import { SearchIcon, XIcon } from "lucide-react"
import { useLocalizedStringFormatter } from "react-aria"
import {
  SearchField as AriaSearchField,
  ButtonContext,
} from "react-aria-components"

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
  /**
   * The element to display on the right side of the search field. This can be used to add a search button or filter button.
   */
  actionElement?: React.ReactNode
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?:
    | React.ReactNode
    | ((validation: ValidationResult) => React.ReactNode)
  /** The icon to display in the search field. Defaults to `SearchIcon`.
   * Set to `null` to hide the icon. */
  searchIcon?: React.ReactNode | null
  inputProps?: Partial<InputProps>
  classNames?: SlotsToClasses<SearchFieldSlots>

  /**
   * The icon to show in the clear button. Defaults to an `XIcon`. Set to `null` to hide the clear button.
   * @example Can also be used to provide a spinner icon while the search is loading.
   */
  clearIcon?: React.ReactNode
}

export function SearchField(originalProps: SearchFieldProps) {
  const [
    {
      label,
      description,
      errorMessage,
      searchIcon,
      inputProps,
      classNames,
      clearIcon,
      actionElement,
      ...props
    },
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
      <div
        className={styles.fieldWrapper({ className: classNames?.fieldWrapper })}
      >
        <FieldGroup className={styles.group({ className: classNames?.group })}>
          {searchIcon !== null &&
            (searchIcon === undefined ? (
              <SearchIcon
                aria-hidden
                className={styles.searchIcon({
                  className: classNames?.searchIcon,
                })}
              />
            ) : (
              searchIcon
            ))}
          <Input
            size={variantProps.size}
            variant="unstyled"
            className={styles.input({ className: classNames?.input })}
            {...inputProps}
          />
          {clearIcon !== null && (
            <Button
              isIconOnly
              isAttached
              variant="clear"
              color="sub"
              size={variantProps.size}
              className={styles.clearButton({
                className: classNames?.clearButton,
              })}
            >
              {clearIcon ?? <XIcon aria-hidden />}
            </Button>
          )}
        </FieldGroup>
        {/* Reset ButtonContext so that buttons in actionElement are not
            treated as the clear button by React Aria's SearchField. */}
        {actionElement && (
          <ButtonContext.Provider value={{}}>
            {actionElement}
          </ButtonContext.Provider>
        )}
      </div>
      {description && (
        <Description size={variantProps.size}>{description}</Description>
      )}
      <FieldError size={variantProps.size}>{errorMessage}</FieldError>
    </AriaSearchField>
  )
}
