import type { VariantProps } from "tailwind-variants";
import { tv } from "../utils/tv";
import { dataFocusVisibleClasses } from "../utils";

export const govtBannerStyles = tv({
  slots: {
    banner: "bg-[#f0f0f0] text-[#474747] px-4 text-xs lg:text-base",
    container: "flex gap-2 items-center min-h-7 py-1",
    crest:
      "h-5 w-4 lg:h-5 lg:w-5 flex-shrink-0 align-top has-[path]:fill-[#ef3320] self-start",
    mainContent: "gap-x-1 flex flex-wrap text-xs lg:text-sm",
    link: "underline text-[#2f5fd0] hover:text-[#4371d6]",
    identifyLabel: "",
    identifyButton: [
      "inline-flex",
      "cursor-pointer",
      "items-center",
      "rounded",
      "text-[#2f5fd0]",
      ...dataFocusVisibleClasses,
    ],
    panel:
      "flex flex-row lg:gap-x-36 gap-x-4 gap-y-4 max-md:flex-col lg:py-11 py-6 md:py-8",
    panelContainer: "flex flex-1 gap-2 md:gap-4",
    panelSection: "flex flex-col gap-y-2 lg:gap-y-3",
    panelIcon:
      "inline-block w-4 h-4 md:w-5 md:h-5 lg:h-6 lg:w-6 shrink-0 self-start",
    chevron:
      "in-aria-expanded:rotate-180 motion-safe:transition-transform h-4 w-4",
    inlineIcon: "shrink-0 h-4 lg:h-5 w-3 lg:w-4 align-text-bottom inline-block",
    panelHeader: "font-bold leading-4 md:leading-5 lg:leading-6",
    panelContent: "",
  },
});

export type GovtBannerVariantProps = VariantProps<typeof govtBannerStyles>;
export type GovtBannerSlots = keyof ReturnType<typeof govtBannerStyles>;
