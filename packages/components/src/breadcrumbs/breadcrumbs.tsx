"use client"

import type {
  BreadcrumbProps as AriaBreadcrumbProps,
  BreadcrumbsProps as AriaBreadcrumbsProps,
  LinkProps,
} from "react-aria-components"
import { useMemo } from "react"
import { ChevronRight } from "lucide-react"
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  MenuTrigger as AriaMenuTrigger,
  Provider,
} from "react-aria-components"

import type { BreadcrumbsSlots, SlotsToClasses } from "@opengovsg/oui-theme"
import { breadcrumbsStyles, composeRenderProps } from "@opengovsg/oui-theme"

import type {
  BreadcrumbSeparator,
  UseProvideBreadcrumbsStylesReturn,
} from "./context"
import { Link } from "../link"
import { Menu, MenuItem } from "../menu"
import { getValidChildren } from "../system/react-utils/children"
import { BreadcrumbsStyleContext, useBreadcrumbsStyleContext } from "./context"

type BreadcrumbsBaseProps<T extends object> = Omit<
  AriaBreadcrumbsProps<T>,
  "items"
> & {
  separator?: BreadcrumbSeparator
  classNames?: SlotsToClasses<BreadcrumbsSlots>
}

export type BreadcrumbsProps<T extends object> = BreadcrumbsBaseProps<T> &
  (
    | {
        /** Data items for the Collection API. Cannot be used with truncation props. */
        items: Iterable<T>
        itemsBeforeTruncate?: never
        itemsAfterTruncate?: never
        renderTruncate?: never
      }
    | {
        items?: never
        /**
         * Number of items to show before the truncation indicator.
         * Setting this to a number enables truncation.
         * Set to `null` to explicitly disable truncation.
         *
         * @example itemsBeforeTruncate={1} with [Home, A, B, C, D, Current]:
         * Renders: Home > ... > Current
         *
         * @default null
         */
        itemsBeforeTruncate?: number | null
        /**
         * Number of items to show after the truncation indicator.
         * @default 2
         */
        itemsAfterTruncate?: number
        /**
         * Custom render function for the dropdown content of the truncation ellipsis.
         * The ellipsis breadcrumb item always renders; this controls the dropdown.
         * Defaults to a dropdown menu showing hidden items.
         * Set to `null` to show the ellipsis with no dropdown.
         */
        renderTruncate?:
          | ((items: BreadcrumbEllipsisItem[]) => React.ReactNode)
          | null
      }
  )

export function Breadcrumbs<T extends object>({
  separator = "chevron",
  itemsBeforeTruncate = null,
  itemsAfterTruncate = 2,
  renderTruncate,
  ...props
}: BreadcrumbsProps<T>) {
  const slots = breadcrumbsStyles()

  const children = useMemo(() => {
    if (itemsBeforeTruncate == null) {
      return props.children
    }

    const validChildren = getValidChildren(props.children as React.ReactNode)

    const totalVisible = itemsBeforeTruncate + itemsAfterTruncate
    if (validChildren.length <= totalVisible) {
      return props.children
    }

    const visibleStart = validChildren.slice(0, itemsBeforeTruncate)
    const visibleEnd =
      itemsAfterTruncate > 0 ? validChildren.slice(-itemsAfterTruncate) : []
    const hiddenItems =
      itemsAfterTruncate > 0
        ? validChildren.slice(itemsBeforeTruncate, -itemsAfterTruncate)
        : validChildren.slice(itemsBeforeTruncate)

    const hiddenItemData = hiddenItems.map((child, index) => {
      const childProps = child.props as {
        href?: string
        children?: React.ReactNode
      }
      return {
        href: childProps.href,
        children: childProps.children,
        id:
          child.key != null ? String(child.key) : `breadcrumb-hidden-${index}`,
      }
    })

    return [
      ...visibleStart,
      <BreadcrumbEllipsis
        key="__breadcrumb-ellipsis"
        items={hiddenItemData}
        renderTruncate={renderTruncate}
      />,
      ...visibleEnd,
    ]
  }, [itemsBeforeTruncate, itemsAfterTruncate, renderTruncate, props.children])

  return (
    <Provider values={[[BreadcrumbsStyleContext, { separator, slots }]]}>
      <AriaBreadcrumbs
        {...props}
        className={slots.base({
          className: props.className ?? props.classNames?.base,
        })}
      >
        {children}
      </AriaBreadcrumbs>
    </Provider>
  )
}

function useBreadcrumbSeparator(
  separatorProp: BreadcrumbSeparator | undefined,
  classNameOverride?: string,
) {
  const context =
    useBreadcrumbsStyleContext() ??
    ({} as Partial<UseProvideBreadcrumbsStylesReturn>)
  const separatorValue =
    separatorProp === undefined ? context?.separator : separatorProp
  const slots = context?.slots ?? breadcrumbsStyles()

  return useMemo(() => {
    if (!separatorValue) return null
    switch (separatorValue) {
      case "chevron":
        return (
          <ChevronRight
            aria-hidden
            className={slots.separator({ className: classNameOverride })}
          />
        )
      default:
        return (
          <span
            aria-hidden
            className={slots.separator({ className: classNameOverride })}
          >
            {separatorValue}
          </span>
        )
    }
  }, [classNameOverride, separatorValue, slots])
}

type BreadcrumbProps = AriaBreadcrumbProps &
  Omit<LinkProps, "className"> & {
    separator?: BreadcrumbSeparator
    classNames?: SlotsToClasses<Exclude<BreadcrumbsSlots, "base">>
  }

export function Breadcrumb({
  separator: separatorProp,
  classNames,
  ...props
}: BreadcrumbProps) {
  const context =
    useBreadcrumbsStyleContext() ??
    ({} as Partial<UseProvideBreadcrumbsStylesReturn>)
  const slots = context?.slots ?? breadcrumbsStyles()
  const separator = useBreadcrumbSeparator(separatorProp, classNames?.separator)

  return (
    <AriaBreadcrumb
      {...props}
      className={composeRenderProps(
        props.className || classNames?.crumb,
        (className, renderProp) => slots.crumb({ className, ...renderProp }),
      )}
    >
      {({ isCurrent }) => (
        <>
          <Link
            {...props}
            className={composeRenderProps(
              props.className ?? classNames?.link,
              (className, renderProps) =>
                slots.link({ className, ...renderProps }),
            )}
          />
          {!isCurrent && separator}
        </>
      )}
    </AriaBreadcrumb>
  )
}

export interface BreadcrumbEllipsisItem {
  href?: string
  children: React.ReactNode
  id: string
}

interface BreadcrumbEllipsisProps {
  items: BreadcrumbEllipsisItem[]
  renderTruncate?: ((items: BreadcrumbEllipsisItem[]) => React.ReactNode) | null
}

function BreadcrumbEllipsis({
  items,
  renderTruncate,
}: BreadcrumbEllipsisProps) {
  const context =
    useBreadcrumbsStyleContext() ??
    ({} as Partial<UseProvideBreadcrumbsStylesReturn>)
  const slots = context?.slots ?? breadcrumbsStyles()
  const separator = useBreadcrumbSeparator(undefined)

  const ellipsisContent = "..."

  if (renderTruncate === null) {
    return (
      <AriaBreadcrumb className={slots.crumb()}>
        <Link isDisabled>{ellipsisContent}</Link>
        {separator}
      </AriaBreadcrumb>
    )
  }

  const menuContent = renderTruncate ? (
    renderTruncate(items)
  ) : (
    <Menu placement="bottom start">
      {items.map((item) => (
        <MenuItem key={item.id} id={item.id} href={item.href}>
          {item.children}
        </MenuItem>
      ))}
    </Menu>
  )

  return (
    <AriaBreadcrumb className={slots.crumb()}>
      <AriaMenuTrigger>
        <Link
          aria-label="Show more breadcrumbs"
          className={slots.ellipsisTrigger()}
        >
          {ellipsisContent}
        </Link>
        {menuContent}
      </AriaMenuTrigger>
      {separator}
    </AriaBreadcrumb>
  )
}
