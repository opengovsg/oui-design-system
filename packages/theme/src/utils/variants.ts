import { mergeWith } from "lodash-es"

import { cn } from "./cn"

const base = {
  solid: {
    main: "bg-interaction-main-default text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
    sub: "bg-interaction-sub-default text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
    neutral:
      "bg-interaction-neutral-default text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
    critical:
      "bg-interaction-critical-default text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
    success:
      "bg-interaction-success-default text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
    warning:
      "bg-interaction-warning-default text-base-content-default disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
  },
  reverse: {
    main: "bg-utility-ui text-interaction-main-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui",
    critical:
      "bg-utility-ui text-interaction-critical-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui",
    sub: "bg-utility-ui text-interaction-sub-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui",
    neutral:
      "bg-utility-ui text-interaction-neutral-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui",
  },
  outline: {
    main: "border border-interaction-main-default text-interaction-main-default disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    sub: "border border-interaction-sub-default text-interaction-sub-default disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    neutral:
      "border border-base-content-strong text-base-content-strong disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    success:
      "border border-interaction-success-default text-interaction-success-default disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    critical:
      "border border-interaction-critical-default text-interaction-critical-default disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    warning:
      "border border-interaction-warning-default text-interaction-warning-default disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    inverse:
      "border border-base-content-inverse text-base-content-inverse disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  },
  clear: {
    main: "border border-utility-ui-clear text-interaction-main-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    critical:
      "border border-utility-ui-clear text-interaction-critical-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    neutral:
      "border border-utility-ui-clear text-base-content-strong disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    sub: "border border-utility-ui-clear text-interaction-sub-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
    inverse:
      "border border-utility-ui-clear text-base-content-inverse disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  },
}

const states = {
  solid: {
    main: "hover:bg-interaction-main-hover active:bg-interaction-main-active pressed:bg-interaction-main-active",
    sub: "hover:bg-interaction-sub-hover active:bg-interaction-sub-active pressed:bg-interaction-sub-active",
    neutral:
      "hover:bg-interaction-neutral-hover active:bg-interaction-neutral-active pressed:bg-interaction-neutral-active",
    critical:
      "hover:bg-interaction-critical-hover active:bg-interaction-critical-active pressed:bg-interaction-critical-active",
    success:
      "hover:bg-interaction-success-hover active:bg-interaction-success-active pressed:bg-interaction-success-active",
    warning:
      "hover:bg-interaction-warning-hover active:bg-interaction-warning-active pressed:bg-interaction-warning-active",
  },
  reverse: {
    main: "hover:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active pressed:bg-interaction-muted-main-active",
    critical:
      "hover:bg-interaction-muted-critical-hover active:bg-interaction-muted-critical-active pressed:bg-interaction-muted-critical-active",
    sub: "hover:bg-interaction-muted-sub-hover active:bg-interaction-muted-sub-active pressed:bg-interaction-muted-sub-active",
    neutral:
      "hover:bg-interaction-muted-neutral-hover active:bg-interaction-muted-neutral-active pressed:bg-interaction-muted-neutral-active",
  },
  outline: {
    main: "hover:bg-interaction-tinted-main-hover active:bg-interaction-tinted-main-active pressed:bg-interaction-tinted-main-active",
    sub: "hover:bg-interaction-tinted-sub-hover active:bg-interaction-tinted-sub-active pressed:bg-interaction-tinted-sub-active",
    neutral:
      "hover:bg-interaction-tinted-neutral-hover active:bg-interaction-tinted-neutral-active pressed:bg-interaction-tinted-neutral-active",
    success:
      "hover:bg-interaction-success-hover/4 active:bg-interaction-success-active/4 pressed:bg-interaction-success-active/4",
    critical:
      "hover:bg-interaction-tinted-critical-hover active:bg-interaction-tinted-critical-active pressed:bg-interaction-tinted-critical-active",
    inverse:
      "hover:bg-interaction-tinted-inverse-hover active:bg-interaction-tinted-inverse-active pressed:bg-interaction-tinted-inverse-active",
  },
  clear: {
    main: "hover:bg-interaction-tinted-main-hover active:bg-interaction-tinted-main-active pressed:bg-interaction-tinted-main-active",
    critical:
      "hover:bg-interaction-tinted-critical-hover active:bg-interaction-tinted-critical-active pressed:bg-interaction-tinted-critical-active",
    neutral:
      "hover:bg-interaction-tinted-neutral-hover active:bg-interaction-tinted-neutral-active pressed:bg-interaction-tinted-neutral-active",
    sub: "hover:bg-interaction-tinted-sub-hover active:bg-interaction-tinted-sub-active pressed:bg-interaction-tinted-sub-active",
    inverse:
      "hover:bg-interaction-tinted-inverse-hover active:bg-interaction-tinted-inverse-active pressed:bg-interaction-tinted-inverse-active",
  },
}

// Background applied while a button is in the pending state. React Aria sets
// `data-pending` (the `pending:` variant) but does not mark the element as
// `:disabled`, so the `disabled:` styles don't apply and the `hover:`/`active:`
// states would otherwise still fire. Mirror the disabled background here and
// override hover/active so a pending button reads as static/disabled.
//
// NOTE: these must be written as full literal class strings (not built via
// string interpolation) so Tailwind's scanner can detect and generate them.
const pendingClassName: Record<keyof typeof base, string> = {
  solid:
    "pending:bg-interaction-support-disabled pending:hover:bg-interaction-support-disabled pending:active:bg-interaction-support-disabled",
  reverse:
    "pending:bg-utility-ui pending:hover:bg-utility-ui pending:active:bg-utility-ui",
  outline:
    "pending:bg-utility-ui-clear pending:hover:bg-utility-ui-clear pending:active:bg-utility-ui-clear",
  clear:
    "pending:bg-utility-ui-clear pending:hover:bg-utility-ui-clear pending:active:bg-utility-ui-clear",
}

const pending = Object.fromEntries(
  Object.entries(base).map(([variant, colors]) => {
    const className = pendingClassName[variant as keyof typeof base]
    return [
      variant,
      Object.fromEntries(
        Object.keys(colors).map((color) => [color, className]),
      ),
    ]
  }),
) as Record<keyof typeof base, Record<string, string>>

export const colorVariants = base

export const colorVariantsWithState = mergeWith(
  {},
  base,
  states,
  pending,
  (objValue, srcValue) => {
    if (typeof objValue === "string" && typeof srcValue === "string") {
      return cn(objValue, srcValue)
    }
  },
)
