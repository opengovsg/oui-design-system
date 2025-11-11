import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const fileDropzoneStyles = tv({
  slots: {
    base: "group flex flex-col items-stretch gap-2",
    icon: "",
    text: "text-center",
    group:
      "group/dropzone rounded-sm outline-transparent transition-colors focus-visible:outline-none",
    dropzone:
      "group-focus-within/dropzone:border-focus-ring! group-focus-within/dropzone:outline-focus-ring outline-transparent transition group-focus-within/dropzone:border-solid group-focus-within/dropzone:outline-1 group-disabled:cursor-not-allowed",
    dropzoneHighlight:
      "text-interaction-links-default group-disabled:text-base-content-disabled underline group-disabled:text-inherit",
  },
  variants: {
    variant: {
      solid: {
        dropzone:
          "text-base-content-default bg-interaction-main-subtle-default border-base-divider-strong dragging:border-base-divider-medium hover:border-base-divider-medium dragging:bg-interaction-main-subtle-active hover:bg-interaction-main-subtle-hover group-disabled:bg-interaction-support-disabled! group-disabled:border-base-divider-medium! group-disabled:text-interaction-support-disabled-content flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed group-read-only:cursor-default",
      },
    },
    size: {
      sm: {},
      md: {},
    },
  },
  compoundVariants: [
    {
      size: "sm",
      variant: "solid",
      className: {
        base: "prose-body-2",
        dropzone: "gap-1 px-12 py-14",
        icon: "size-7",
      },
    },
    {
      size: "md",
      variant: "solid",
      className: {
        base: "prose-body-1",
        dropzone: "gap-2 px-12 py-16",
        icon: "size-14",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "solid",
  },
})

export type FileDropzoneVariantProps = VariantProps<typeof fileDropzoneStyles>
export type FileDropzoneSlots = keyof ReturnType<typeof fileDropzoneStyles>

export const fileInfoDropzoneStyles = tv({
  slots: {
    base: "border-base-divider-medium bg-interaction-main-subtle-default flex items-stretch overflow-hidden rounded-sm border",
    container: "flex flex-1",
    textContainer:
      "text-base-content-default flex shrink grow flex-col items-start justify-center truncate",
    imageContainer:
      "inline-flex items-center justify-center overflow-hidden bg-white",
    image: "object-contain",
    name: "max-w-full truncate",
    size: "text-base-content-medium",
    error: "text-utility-feedback-critical",
    actionButton: "ml-auto self-center",
  },
  variants: {
    variant: {
      solid: {},
    },
    size: {
      sm: {
        base: "min-h-14",
        container: "gap-4 px-4",
        textContainer: "prose-caption-1 min-h-14 gap-1",
        size: "prose-caption-2",
        error: "prose-caption-2",
      },
      md: {
        base: "min-h-18",
        container: "gap-4 px-4 py-3.5",
        textContainer: "prose-subhead-1 h-full gap-1",
        size: "prose-caption-1",
        error: "prose-caption-1",
      },
    },
    imagePreview: {
      small: {
        image: "p-1",
        imageContainer: "border-base-divider-medium border-r",
      },
      large: {
        image: "w-full p-1",
        base: "flex-col",
      },
    },
  },
  compoundVariants: [
    {
      size: "sm",
      imagePreview: "small",
      className: {
        imageContainer: "h-auto w-full max-w-21",
        image: "max-h-14 max-w-21",
      },
    },
    {
      size: "md",
      imagePreview: "small",
      className: {
        imageContainer: "h-auto w-full max-w-24",
        image: "max-h-18 max-w-24",
      },
    },
  ],
  defaultVariants: {
    variant: "solid",
    imagePreview: "small",
    size: "md",
  },
})

export type FileInfoDropzoneVariantProps = VariantProps<
  typeof fileInfoDropzoneStyles
>
export type FileInfoDropzoneSlots = keyof ReturnType<
  typeof fileInfoDropzoneStyles
>
