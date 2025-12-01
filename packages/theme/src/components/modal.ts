import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"

export const modalStyles = tv({
  slots: {
    base: "bg-base-canvas-default relative z-50 mx-1 my-1 box-border flex w-full max-w-md flex-col rounded-2xl border border-black/10 bg-clip-padding text-left align-middle text-slate-700 shadow-md outline-none sm:mx-6 sm:my-16 dark:border-white/10 dark:bg-zinc-800/70 dark:text-zinc-300 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]",
    overlay:
      "fixed top-0 left-0 isolate z-50 flex h-(--visual-viewport-height) w-full items-center justify-center text-center",
    dialog: "flex h-full flex-col outline-none",
    header: "flex flex-initial px-6 py-4 text-start",
    body: "flex flex-1 flex-col gap-3 px-6 py-2 text-start",
    footer: "flex flex-row justify-end gap-2 px-6 py-4",
    closeButton: [
      "absolute end-1 top-1 appearance-none p-2 outline-none select-none",
      ...focusVisibleClasses,
    ],
  },
  variants: {
    animation: {
      none: {},
      fade: {},
      zoom: {},
    },
    placement: {
      auto: {
        overlay: "items-end sm:items-center",
      },
      center: {
        overlay: "items-center sm:items-center",
      },
      top: {
        overlay: "items-start sm:items-start",
      },
      "top-center": {
        overlay: "items-start sm:items-center",
      },
      bottom: {
        overlay: "items-end sm:items-end",
      },
      "bottom-center": {
        overlay: "items-end sm:items-center",
      },
    },
    radius: {
      none: { base: "rounded-none" },
      sm: { base: "rounded-sm" },
      md: { base: "rounded-md" },
      lg: { base: "rounded-lg" },
    },
    overlay: {
      transparent: {
        overlay: "bg-transparent",
      },
      blur: {
        overlay: "bg-base-canvas-overlay backdrop-blur-md",
      },
      opaque: {
        overlay: "bg-base-canvas-overlay",
      },
    },
    isEntering: {
      true: {
        base: "",
      },
    },
    isExiting: {
      true: {
        base: "",
      },
    },
    size: {
      xs: {
        base: "max-w-xs",
      },
      sm: {
        base: "max-w-sm",
      },
      md: {
        base: "max-w-md",
      },
      lg: {
        base: "max-w-lg",
      },
      xl: {
        base: "max-w-xl",
      },
      "2xl": {
        base: "max-w-2xl",
      },
      "3xl": {
        base: "max-w-3xl",
      },
      "4xl": {
        base: "max-w-4xl",
      },
      "5xl": {
        base: "max-w-5xl",
      },
      desktop: {
        base: "max-w-[680px]",
        header: "prose-h4",
        body: "prose-body-2",
      },
      mobile: {
        base: "max-w-[312px]",
        header: "prose-h5",
        body: "prose-body-2",
      },
      full: {
        header: "prose-h4",
        body: "prose-body-2",
        dialog: "flex-1",
        base: "mx-0 my-0 min-h-[100dvh] max-w-full !rounded-none sm:mx-0 sm:my-0",
      },
    },
    scrollBehavior: {
      normal: {
        overlay: "overflow-y-auto",
        dialog: "overflow-y-hidden",
      },
      inside: {
        base: "max-h-[calc(100%_-_8rem)]",
        body: "overflow-y-auto",
        dialog: "overflow-y-hidden",
      },
      outside: {
        overlay: "items-start overflow-y-auto sm:items-start",
        base: "my-16",
      },
    },
  },
  compoundVariants: [
    // Special affordance for full screen modals to align to top and allow scrolling
    {
      size: "full",
      scrollBehavior: "normal",
      class: {
        overlay: "overflow-y-auto",
      },
    },
    // Animations
    {
      isEntering: true,
      animation: "zoom",
      class: {
        base: "animate-in zoom-in-105 duration-200 ease-in",
      },
    },
    {
      isExiting: true,
      animation: "zoom",
      class: {
        base: "motion-safe:animate-out motion-safe:zoom-out-105 duration-200 ease-out",
      },
    },
    {
      isEntering: true,
      animation: ["fade", "zoom"],
      class: {
        overlay:
          "motion-safe:animate-in motion-safe:fade-in duration-200 ease-out",
      },
    },
    {
      isExiting: true,
      animation: ["fade", "zoom"],
      class: {
        overlay:
          "motion-safe:animate-out motion-safe:fade-out duration-200 ease-in",
      },
    },
  ],
  defaultVariants: {
    overlay: "blur",
    size: "desktop",
    radius: "sm",
    scrollBehavior: "normal",
    animation: "zoom",
  },
})

export type ModalVariantProps = VariantProps<typeof modalStyles>
export type ModalSlots = keyof ReturnType<typeof modalStyles>
