import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const skipNavLinkStyles = tv({
  base: "sr-only inline-flex rounded-md p-10 text-sm font-semibold select-none focus:not-sr-only focus:absolute focus:z-100",
})

export type SkipNavLinkVariantProps = VariantProps<typeof skipNavLinkStyles>
