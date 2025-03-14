import type { ContextValue } from "react-aria-components"

import type { SelectVariantProps } from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"

export const [SelectVariantContext, useSelectVariantContext] = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContextValue<SelectVariantProps, any>
>({
  name: "SelectVariantContext",
  strict: true,
})
