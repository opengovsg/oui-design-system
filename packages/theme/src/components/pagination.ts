import type { VariantProps } from "tailwind-variants"

import { dataFocusVisibleClasses } from "../utils/classes"
import { tv } from "../utils/tv"
import { colorVariants } from "../utils/variants"

/**
 * Pagination wrapper **Tailwind Variants** component
 *
 * const {base, cursor, prev, next, item } = paginationStyles({...})
 *
 * @example
 * <ul className={base()} aria-label="pagination navigation">
 *    <li className={cursor()} aria-hidden="true">{active page}</li> // this marks the active page
 *    <li role="button" className={prev()} aria-label="Go to previous page" data-disabled="true">Prev</li>
 *    <li role="button" className={item()} aria-label="page 1" data-active="true">1</li>
 *    <li role="button" className={item()} aria-label="page 2">2</li>
 *    <li role="button" className={item()} aria-hidden="true">...</li>
 *    <li role="button" className={item()} aria-label="page 10">10</li>
 *    <li role="button" className={next()} aria-label="Go to next page">Next</li>
 *  </ul>
 */
export const paginationStyles = tv({
  slots: {
    base: ["p-2.5", "-m-2.5", "overflow-x-scroll", "scrollbar-hide"],
    wrapper: [
      "flex",
      "flex-nowrap",
      "h-fit",
      "max-w-fit",
      "relative",
      "gap-1",
      "items-center",
      "overflow-visible",
    ],
    item: [
      "tap-highlight-transparent",
      "select-none",
      "touch-none",
      "transition",
    ],
    prev: "",
    next: "",
    cursor: [
      "absolute",
      "flex",
      "overflow-visible",
      "items-center",
      "justify-center",
      "origin-center",
      "left-0",
      "select-none",
      "touch-none",
      "pointer-events-none",
      "z-20",
      "text-standard-white",
    ],
    forwardIcon: [
      "hidden",
      "group-hover:block",
      "group-data-[focus-visible=true]:block",
      "data-[before=true]:rotate-180",
    ],
    ellipsis: "group-hover:hidden group-data-[focus-visible=true]:hidden",
    chevronNext: "rotate-180",
  },
  variants: {
    variant: {
      bordered: {
        item: [
          "border-2",
          "border-base-divider-strong",
          "bg-transparent",
          "data-[hover=true]:bg-interaction-muted-neutral-hover",
        ],
      },
      light: {
        item: "bg-transparent",
      },
      flat: {},
      faded: {
        item: ["border-2", "border-base-divider-medium"],
      },
    },
    color: {
      default: {
        cursor: colorVariants.solid.main,
      },
      main: {
        cursor: colorVariants.solid.main,
      },
      neutral: {
        cursor: colorVariants.solid.neutral,
      },
      success: {
        cursor: colorVariants.solid.success,
      },
      warning: {
        cursor: colorVariants.solid.warning,
      },
      critical: {
        cursor: colorVariants.solid.critical,
      },
    },
    size: {
      sm: {
        item: "prose-body-2",
        cursor: "prose-body-2",
      },
      md: {
        item: "prose-body-2",
        cursor: "prose-body-2",
      },
      lg: {
        item: "prose-body-1",
        cursor: "prose-body-1",
      },
    },
    radius: {
      none: {},
      sm: {},
      md: {},
      lg: {},
      full: {},
    },
    isCompact: {
      true: {
        wrapper: "gap-0",
      },
    },
    isDisabled: {
      true: {
        base: "pointer-events-none",
      },
    },
    disableCursorAnimation: {
      true: {
        cursor: "hidden",
      },
    },
    disableAnimation: {
      true: {
        item: "transition-none",
        cursor: "transition-none",
      },
      false: {
        item: [
          "data-[pressed=true]:scale-[0.95]",
          "transition-transform-background",
        ],
        cursor: [
          "data-[moving=true]:transition-transform",
          "!data-[moving=true]:duration-300",
          // this hides the cursor and only shows it once it has been moved to its initial position
          "opacity-0",
          "data-[moving]:opacity-100",
        ],
      },
    },
  },
  defaultVariants: {
    variant: "light",
    color: "neutral",
    size: "md",
    radius: "sm",
    isCompact: false,
    isDisabled: false,
    disableCursorAnimation: false,
  },
  compoundVariants: [
    // isCompact / bordered
    {
      isCompact: true,
      variant: "bordered",
      class: {
        item: "[&:not(:first-of-type)]:ms-[calc(theme(borderWidth.2)*-1)]",
      },
    },
    /**
     * --------------------------------------------------------
     * disableCursorAnimation
     * the classNames will be applied to the active item
     * --------------------------------------------------------
     */
    // disableCursorAnimation / color
    {
      disableCursorAnimation: true,
      color: "default",
      class: {
        item: [
          "data-[active=true]:bg-default-400",
          "data-[active=true]:border-default-400",
          "data-[active=true]:text-white",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "main",
      class: {
        item: [
          "data-[active=true]:bg-interaction-main-active",
          "data-[active=true]:border-interaction-main-active",
          "data-[active=true]:text-white",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "neutral",
      class: {
        item: [
          "data-[active=true]:bg-interaction-support-selected",
          "data-[active=true]:border-interaction-support-selected",
          "data-[active=true]:text-white",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "success",
      class: {
        item: [
          "data-[active=true]:bg-interaction-success-active",
          "data-[active=true]:border-interaction-success-active",
          "data-[active=true]:text-white",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "warning",
      class: {
        item: [
          "data-[active=true]:bg-interaction-warning-active",
          "data-[active=true]:border-interaction-warning-active",
          "data-[active=true]:text-base-content-strong",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "critical",
      class: {
        item: [
          "data-[active=true]:bg-interaction-critical-active",
          "data-[active=true]:border-interaction-critical-active",
          "data-[active=true]:text-white",
        ],
      },
    },
  ],
  compoundSlots: [
    // without variant
    {
      slots: ["item", "prev", "next"],
      class: [
        "flex",
        "flex-wrap",
        "truncate",
        "box-border",
        "outline-transparent outline-solid",
        "items-center",
        "justify-center",
        "text-base-content-default",
        // focus ring
        ...dataFocusVisibleClasses,
        "outline-offset-0",
        // disabled
        "data-[disabled=true]:text-interaction-support-disabled-content",
        "data-[disabled=true]:pointer-events-none",
      ],
    },
    {
      slots: ["item", "prev", "next"],
      variant: "flat",
      class: [
        "bg-interaction-muted-neutral-hover",
        "[&[data-hover=true]:not([data-active=true])]:bg-interaction-neutral-subtle-default",
        "[&[data-pressed=true]:not([data-active=true])]:bg-interaction-neutral-subtle-hover",
        "active:bg-interaction-muted-neutral-active",
      ],
    },
    {
      slots: ["item", "prev", "next"],
      variant: "faded",
      class: [
        "bg-default-50",
        "[&[data-hover=true]:not([data-active=true])]:bg-default-100",
        "active:bg-default-200",
      ],
    },
    {
      slots: ["item", "prev", "next"],
      variant: "light",
      class: [
        "[&[data-hover=true]:not([data-active=true])]:bg-interaction-neutral-subtle-default",
        "[&[data-pressed=true]:not([data-active=true])]:bg-interaction-neutral-subtle-hover",
        "active:bg-interaction-muted-neutral-active",
      ],
    },
    // size
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "sm",
      isCompact: false,
      class: "h-7 w-7 min-w-7 [&_svg]:size-5",
    },
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "md",
      isCompact: false,
      class: "h-8 w-8 min-w-8 [&_svg]:size-6",
    },
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "lg",
      isCompact: false,
      class: "h-9 w-9 min-w-9 [&_svg]:size-7",
    },
    // radius
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "none",
      class: "rounded-none",
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "sm",
      class: "rounded-sm",
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "md",
      class: "rounded-md",
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "lg",
      class: "rounded-lg",
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "full",
      class: "rounded-full",
    },
  ],
})

export type PaginationVariantProps = VariantProps<typeof paginationStyles>
export type PaginationSlots = keyof ReturnType<typeof paginationStyles>
