import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"

export const modalStyles = tv({
  base: "max-h-full w-full max-w-md rounded-2xl border border-black/10 bg-white bg-clip-padding text-left align-middle text-slate-700 shadow-2xl dark:border-white/10 dark:bg-zinc-800/70 dark:text-zinc-300 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]",
  slots: {
    base: "bg-base-canvas-default relative z-50 mx-1 my-1 box-border flex w-full flex-col shadow-md outline-none sm:mx-6 sm:my-16",
    overlay: "z-50",
    header: "prose-h4 flex flex-initial px-6 py-4 text-start",
    body: "prose-body-2 flex flex-1 flex-col gap-3 px-6 py-2 text-start",
    footer: "flex flex-row justify-end gap-2 px-6 py-4",
    closeButton: [
      "absolute end-1 top-1 appearance-none p-2 outline-none select-none",
      ...focusVisibleClasses,
    ],
  },
  variants: {
    radius: {
      none: { base: "rounded-none" },
      sm: { base: "rounded-sm" },
      md: { base: "rounded-md" },
      lg: { base: "rounded-lg" },
    },
    overlay: {
      transparent: {
        overlay: "hidden",
      },
      blur: {
        overlay:
          "bg-base-canvas-overlay fixed top-0 left-0 isolate z-20 flex h-(--visual-viewport-height) w-full items-center justify-center p-4 text-center backdrop-blur-md",
      },
    },
    isEntering: {
      true: { base: "animate-in zoom-in-105 duration-200 ease-out" },
    },
    isExiting: {
      true: { base: "animate-out zoom-out-95 duration-200 ease-in" },
    },
  },
  compoundVariants: [
    {
      overlay: "blur",
      isEntering: true,
      class: { overlay: "animate-in fade-in duration-200 ease-out" },
    },
    {
      overlay: "blur",
      isExiting: true,
      class: { overlay: "animate-out fade-out duration-200 ease-in" },
    },
  ],
  defaultVariants: {
    overlay: "blur",
    radius: "sm",
  },
})

export type ModalVariantProps = VariantProps<typeof modalStyles>
export type ModalSlots = keyof ReturnType<typeof modalStyles>
