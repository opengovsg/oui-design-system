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
  Provider,
} from "react-aria-components"

import type { BreadcrumbsSlots, SlotsToClasses } from "@opengovsg/oui-theme"
import { breadcrumbsStyles, composeRenderProps } from "@opengovsg/oui-theme"

import type {
  BreadcrumbSeparator,
  UseProvideBreadcrumbsStylesReturn,
} from "./context"
import { Link } from "../link"
import { BreadcrumbsStyleContext, useBreadcrumbsStyleContext } from "./context"

export interface BreadcrumbsProps<T extends object>
  extends AriaBreadcrumbsProps<T> {
  separator?: BreadcrumbSeparator
  classNames?: SlotsToClasses<BreadcrumbsSlots>
}

export function Breadcrumbs<T extends object>({
  separator = "chevron",
  ...props
}: BreadcrumbsProps<T>) {
  const slots = breadcrumbsStyles()

  return (
    <Provider values={[[BreadcrumbsStyleContext, { separator, slots }]]}>
      <AriaBreadcrumbs
        {...props}
        className={slots.base({
          className: props.className ?? props.classNames?.base,
        })}
      />
    </Provider>
  )
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
  const separatorValue =
    separatorProp === undefined ? context?.separator : separatorProp

  const slots = context?.slots ?? breadcrumbsStyles()

  const separator = useMemo(() => {
    if (!separatorValue) return null
    switch (separatorValue) {
      case "chevron":
        return (
          <ChevronRight
            aria-hidden
            className={slots.separator({ className: classNames?.separator })}
          />
        )
      default:
        return (
          <span
            aria-hidden
            className={slots.separator({ className: classNames?.separator })}
          >
            {separatorValue}
          </span>
        )
    }
  }, [classNames?.separator, separatorValue, slots])

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
