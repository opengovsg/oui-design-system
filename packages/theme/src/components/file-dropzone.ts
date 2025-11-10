import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const fileDropzoneStyles = tv({
  slots: {
    base: "group flex flex-col gap-2",
    icon: "",
    text: "text-center",
    group:
      "focus-within:outline-focus-ring rounded-sm outline-transparent transition-colors focus-within:outline-1",
    dropzone: "transition-colors group-disabled:cursor-not-allowed",
    dropzoneHighlight:
      "text-interaction-links-default group-disabled:text-base-content-disabled underline group-disabled:text-inherit",
  },
  variants: {
    variant: {
      solid: {
        dropzone:
          "text-base-content-default bg-interaction-main-subtle-default border-base-divider-strong dragging:border-base-divider-medium hover:border-base-divider-medium dragging:bg-interaction-main-subtle-active hover:bg-interaction-main-subtle-hover group-focus-within:border-focus-ring! group-disabled:bg-interaction-support-disabled! group-disabled:border-base-divider-medium! group-disabled:text-interaction-support-disabled-content flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed group-read-only:cursor-default group-focus-within:border-solid",
      },
    },
    size: {
      md: {},
    },
  },
  compoundVariants: [
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
    base: "flex items-center gap-x-4 border-b py-2 first:mt-4 last:mb-4",
    textContainer: "flex shrink grow flex-col items-start truncate",
    imageContainer: "",
    image: "",
    name: "",
    size: "",
    error: "",
    actionButton: "ml-auto",
  },
  variants: {
    variant: {
      solid: {},
    },
    size: {
      md: {
        actionButton: "",
        size: "text-xs",
        error: "text-destructive text-xs",
        name: "max-w-full truncate text-sm",
      },
    },
    imagePreview: {
      small: {
        imageContainer:
          "bg-muted flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded border",
        image: "object-cover",
      },
      large: {},
    },
  },
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
