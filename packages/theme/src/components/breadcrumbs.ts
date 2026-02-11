import { tv } from "../utils/tv"

export const breadcrumbsStyles = tv({
  slots: {
    base: "flex gap-1",
    crumb: "flex items-center gap-1",
    link: "disabled:text-base-content-default inline-flex items-center justify-center *:h-[1em]",
    separator:
      "text-interaction-support-disabled-content inline-flex h-[1em] w-fit items-center justify-center leading-none",
    ellipsisTrigger: "",
  },
})

export type BreadcrumbsSlots = keyof ReturnType<typeof breadcrumbsStyles>
