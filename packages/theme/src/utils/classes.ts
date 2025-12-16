import { tv } from "./tv"

export const focusVisibleClasses = [
  "outline-none",
  "outline-transparent",
  "outline-offset-2",
  "focus-visible:outline-utility-focus-default",
  "focus-visible:outline-solid",
  "focus-visible:outline-2",
] as const

export const dataFocusVisibleClasses = [
  "outline-none",
  "outline-transparent",
  "outline-offset-2",
  "data-[focus-visible=true]:outline-utility-focus-default",
  "data-[focus-visible=true]:outline-solid",
  "data-[focus-visible=true]:outline-2",
] as const

export const focusClasses = [
  "outline-none",
  "outline-transparent",
  "outline-offset-2",
  "focus:outline-utility-focus-default",
  "focus:outline-solid",
  "focus:outline-2",
] as const

export const groupFocusVisibleClasses = [
  "in-focus-visible:z-10",
  "in-focus-visible:outline-2",
  "outline-utility-focus-default",
  "outline-offset-2",
] as const

export const racFocusRing = tv({
  base: "outline-offset-2 outline-none",
  variants: {
    isFocusVisible: {
      false: "outline-transparent",
      true: "outline-utility-focus-default outline-2 outline-solid",
    },
  },
})

/**
 * This classes centers the element by using absolute positioning.
 */
export const translateCenterClasses = [
  "absolute",
  "top-1/2",
  "left-1/2",
  "-translate-x-1/2",
  "-translate-y-1/2",
]
