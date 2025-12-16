import type { VariantProps } from "tailwind-variants"

import {
  dataFocusVisibleClasses,
  translateCenterClasses,
} from "../utils/classes"
import { tv } from "../utils/tv"

export const avatarStyles = tv({
  base: [],
  slots: {
    base: [
      "z-(--avatar-zindex) relative box-border flex items-center justify-center overflow-hidden bg-clip-padding align-middle",
      ...dataFocusVisibleClasses,
    ],
    icon: "",
    fallback: [...translateCenterClasses, "flex items-center justify-center"],
    image:
      "size-full object-cover object-center opacity-0 transition-opacity duration-500 data-[loaded=true]:opacity-100",
  },
  variants: {
    isInGroup: {
      true: {
        base: "border-utility-ui -ms-2 border first-of-type:ms-0",
      },
    },
    prominence: {
      strong: {},
      subtle: {},
    },
    color: {
      primary: {},
      white: {},
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-small",
      },
      md: {
        base: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
      },
      full: {
        base: "rounded-full",
      },
    },
    size: {
      md: { base: "prose-subhead-2 size-10", icon: "size-5" },
      sm: { base: "prose-caption-1 size-9", icon: "size-4" },
      xs: { base: "prose-caption-1 size-8", icon: "size-4" },
      "2xs": { base: "prose-legal size-5", icon: "size-2.5" },
    },
  },
  compoundVariants: [
    {
      prominence: "strong",
      color: "primary",
      className: {
        base: "bg-interaction-main-default text-base-content-inverse",
      },
    },
    {
      prominence: "subtle",
      color: "primary",
      className: {
        base: "bg-interaction-main-subtle-default text-interaction-main-default",
      },
    },
    {
      prominence: "subtle",
      color: "white",
      className: {
        base: "border-interaction-main-subtle-default text-interaction-main-default border",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    radius: "full",
    prominence: "strong",
    color: "primary",
  },
})

export type AvatarVariantProps = VariantProps<typeof avatarStyles>
export type AvatarSlots = keyof ReturnType<typeof avatarStyles>

export const avatarGroupStyles = tv({
  slots: {
    base: "isolate flex h-auto w-max items-center justify-center",
    counter: "",
  },
})

export type AvatarGroupVariantProps = VariantProps<typeof avatarGroupStyles>
export type AvatarGroupSlots = keyof ReturnType<typeof avatarGroupStyles>
