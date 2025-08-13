import { tv } from "./tv"

export const focusVisibleClasses = [
  "outline-none",
  "outline-transparent",
  "outline-offset-2",
  "focus-visible:outline-focus-ring",
  "focus-visible:outline-solid",
  "focus-visible:outline-2",
] as const

export const dataFocusVisibleClasses = [
  "outline-none",
  "outline-transparent",
  "outline-offset-2",
  "data-[focus-visible=true]:outline-focus-ring",
  "data-[focus-visible=true]:outline-solid",
  "data-[focus-visible=true]:outline-2",
] as const

export const focusClasses = [
  "outline-none",
  "outline-transparent",
  "outline-offset-2",
  "focus:outline-focus-ring",
  "focus:outline-solid",
  "focus:outline-2",
] as const

export const groupFocusVisibleClasses = [
  "in-focus-visible:z-10",
  "in-focus-visible:outline-2",
  "outline-focus-ring",
  "outline-offset-2",
] as const

export const racFocusRing = tv({
  base: "outline-offset-2 outline-none",
  variants: {
    isFocusVisible: {
      false: "outline-transparent",
      true: "outline-focus-ring outline-2 outline-solid",
    },
  },
})
