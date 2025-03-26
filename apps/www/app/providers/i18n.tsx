"use client"

import { I18nProvider as AriaI18nProvider } from "react-aria-components"

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  return <AriaI18nProvider locale="en-SG">{children}</AriaI18nProvider>
}
