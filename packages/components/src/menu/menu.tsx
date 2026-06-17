"use client"

import type { ForwardedRef } from "react"
import type {
  MenuItemProps as AriaMenuItemProps,
  MenuProps as AriaMenuProps,
  MenuSectionProps as AriaMenuSectionProps,
  ContextValue,
  SelectionMode,
  SeparatorProps,
} from "react-aria-components"
import { forwardRef, useCallback, useMemo } from "react"
import { Check, ChevronRight } from "lucide-react"
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  SubmenuTrigger as AriaSubmenuTrigger,
  Collection,
  composeRenderProps,
  Header,
  Provider,
  Separator,
  useContextProps,
} from "react-aria-components"

import type {
  ListBoxItemVariantProps,
  MenuItemVariantSlots,
  MenuSectionVariantProps,
  MenuSectionVariantSlots,
  MenuVariantProps,
  MenuVariantSlots,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  listBoxItemStyles,
  menuDividerStyles,
  menuItemStyles,
  menuSectionStyles,
  menuStyles,
} from "@opengovsg/oui-theme"

import type { PopoverProps } from "../popover"
import { Popover } from "../popover"
import { createContext } from "../system/react-utils"
import { forwardRefGeneric, mapPropsVariants } from "../system/utils"

export const [MenuVariantContext, useMenuVariantContext] = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContextValue<MenuVariantProps, any>,
  false
>({
  name: "MenuVariantContext",
  strict: false,
})
/**
 * Popover positioning props forwarded from `Menu` to its underlying `Popover`.
 * These let consumers bound where/how the menu flips — most importantly
 * `boundaryElement`/`scrollRef`, which constrain flipping to a scroll container
 * rather than the whole viewport.
 */
type ForwardedPopoverProps = Pick<
  PopoverProps,
  | "placement"
  | "boundaryElement"
  | "scrollRef"
  | "shouldFlip"
  | "maxHeight"
  | "containerPadding"
  | "offset"
  | "crossOffset"
  | "shouldUpdatePosition"
  | "arrowBoundaryOffset"
  | "triggerRef"
>

export interface MenuProps<T>
  extends AriaMenuProps<T>,
    MenuVariantProps,
    ForwardedPopoverProps {
  classNames?: SlotsToClasses<MenuVariantSlots>
}

function MenuInner<T extends object>(
  originalProps: MenuProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  // Might be nested in a submenu
  ;[originalProps, ref] = useContextProps(
    originalProps,
    ref,
    MenuVariantContext,
  )

  const [props, variantProps] = mapPropsVariants(
    originalProps,
    menuStyles.variantKeys,
  )

  // Pull popover-positioning props out so they reach `Popover` (where react-aria
  // positions the overlay) instead of being spread onto the inner `AriaMenu`,
  // where they have no effect.
  const {
    className,
    classNames,
    placement,
    boundaryElement,
    scrollRef,
    shouldFlip,
    maxHeight,
    containerPadding,
    offset,
    crossOffset,
    shouldUpdatePosition,
    arrowBoundaryOffset,
    triggerRef,
    ...rest
  } = props

  const popoverProps: ForwardedPopoverProps = {
    placement,
    boundaryElement,
    scrollRef,
    shouldFlip,
    maxHeight,
    containerPadding,
    offset,
    crossOffset,
    shouldUpdatePosition,
    arrowBoundaryOffset,
    triggerRef,
  }

  const styles = menuStyles(variantProps)

  return (
    <Provider values={[[MenuVariantContext, variantProps]]}>
      <Popover
        {...popoverProps}
        className={styles.popover({ className: classNames?.popover })}
      >
        <AriaMenu
          {...rest}
          ref={ref}
          className={composeRenderProps(
            className ?? classNames?.base,
            (className, renderProps) =>
              styles.base({
                className,
                ...renderProps,
              }),
          )}
        />
      </Popover>
    </Provider>
  )
}

export const Menu = forwardRefGeneric(MenuInner)

export interface MenuItemProps
  extends AriaMenuItemProps,
    ListBoxItemVariantProps {
  classNames?: SlotsToClasses<MenuItemVariantSlots>
  multipleSelectionIcon?: React.ReactNode | null
  singleSelectionIcon?: React.ReactNode | null

  /**
   * Element to be rendered in the left side of the menu item.
   */
  startContent?: React.ReactNode
  /**
   * Element to be rendered in the right side of the menu item.
   */
  endContent?: React.ReactNode
}

export const MenuItem = forwardRef(function MenuItem(
  originalProps: MenuItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  ;[originalProps, ref] = useContextProps(
    originalProps,
    ref,
    MenuVariantContext,
  )
  const [
    {
      classNames,
      className,
      multipleSelectionIcon: multipleSelectionIconProp,
      singleSelectionIcon: singleSelectionIconProp,
      startContent,
      endContent,
      ...props
    },
    variantProps,
  ] = mapPropsVariants(originalProps, listBoxItemStyles.variantKeys)

  const styles = menuItemStyles(variantProps)

  const multipleSelectionIcon = useMemo(() => {
    if (multipleSelectionIconProp !== undefined) {
      return multipleSelectionIconProp
    }
    return (
      <Check
        aria-hidden
        className={styles.icon({ className: classNames?.icon })}
      />
    )
  }, [classNames?.icon, multipleSelectionIconProp, styles])

  const singleSelectionIcon = useMemo(() => {
    if (singleSelectionIconProp !== undefined) {
      return singleSelectionIconProp
    }
    return (
      <Check
        aria-hidden
        className={styles.icon({ className: classNames?.icon })}
      />
    )
  }, [classNames?.icon, singleSelectionIconProp, styles])

  const showIconContainer = useCallback(
    (selectionMode: SelectionMode): boolean => {
      switch (selectionMode) {
        case "none":
          return false
        case "multiple":
          return !!multipleSelectionIcon
        case "single":
          return !!singleSelectionIcon
      }
    },
    [multipleSelectionIcon, singleSelectionIcon],
  )

  const defaultTextValue = useMemo(() => {
    if (props.textValue) {
      return props.textValue
    }
    if (typeof props.children === "string") {
      return props.children
    }
    return undefined
  }, [props.children, props.textValue])

  return (
    <AriaMenuItem
      ref={ref}
      textValue={defaultTextValue}
      {...props}
      isDisabled={variantProps.isDisabled}
      className={composeRenderProps(
        className ?? classNames?.container,
        (className, renderProps) =>
          styles.container({
            className,
            ...renderProps,
          }),
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { selectionMode, isSelected, hasSubmenu }) => (
          <>
            {startContent}
            <span
              className={styles.label({
                className: classNames?.label,
              })}
            >
              {children}
            </span>
            {showIconContainer(selectionMode) && (
              <span
                className={styles.iconContainer({
                  className: classNames?.iconContainer,
                })}
              >
                {isSelected &&
                  selectionMode === "multiple" &&
                  multipleSelectionIcon}
                {isSelected &&
                  selectionMode === "single" &&
                  singleSelectionIcon}
              </span>
            )}
            {endContent}
            {hasSubmenu && (
              <ChevronRight
                aria-hidden
                className={styles.icon({
                  className: classNames?.icon,
                })}
              />
            )}
          </>
        ),
      )}
    </AriaMenuItem>
  )
})

export function MenuSeparator(props: SeparatorProps) {
  return (
    <Separator
      {...props}
      className={menuDividerStyles({
        className: props.className,
      })}
    />
  )
}

export interface MenuSectionProps<T>
  extends AriaMenuSectionProps<T>,
    MenuSectionVariantProps {
  /**
   * The title of the section.\
   * If not provided, the `aria-label` prop must be provided for accessibility.
   */
  title?: string
  items?: T[]
  classNames?: SlotsToClasses<MenuSectionVariantSlots>
}

function MenuSectionInner<T extends object>(
  originalProps: MenuSectionProps<T>,
  ref: ForwardedRef<HTMLElement>,
) {
  ;[originalProps, ref] = useContextProps(
    originalProps,
    ref,
    MenuVariantContext,
  )
  const [{ title, classNames, ...props }, variantProps] = mapPropsVariants(
    originalProps,
    menuSectionStyles.variantKeys,
  )

  const styles = menuSectionStyles(variantProps)

  return (
    <AriaMenuSection
      ref={ref}
      className={styles.base({
        className: props.className ?? classNames?.base,
      })}
      {...props}
    >
      {title && (
        <Header
          className={styles.header({
            className: classNames?.header,
          })}
        >
          {title}
        </Header>
      )}
      <Collection items={props.items}>{props.children}</Collection>
    </AriaMenuSection>
  )
}

export const MenuSection = forwardRefGeneric(MenuSectionInner)

export const MenuTrigger = AriaMenuTrigger
export const SubmenuTrigger = AriaSubmenuTrigger
