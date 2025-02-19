import { tv } from "./tv"

export const focusVisibleClasses = [
  "outline-hidden",
  "focus-visible:z-10",
  "focus-visible:outline-2",
  "focus-visible:outline-focus-ring",
  "focus-visible:outline-offset-2",
] as const

export const groupFocusVisibleClasses = [
  "in-focus-visible:z-10",
  "in-focus-visible:outline-2",
  "in-focus-visible:outline-focus-ring",
  "in-focus-visible:outline-offset-2",
] as const

export const racFocusRing = tv({
  base: "outline-focus-ring outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-hidden",
      true: "outline-2",
    },
  },
})
