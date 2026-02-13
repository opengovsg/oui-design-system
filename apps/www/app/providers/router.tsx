"use client"

import { useRouter } from "next/navigation"
import { RouterProvider as AriaRouterProvider } from "react-aria-components"

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  return (
    <AriaRouterProvider navigate={router.push}>{children}</AriaRouterProvider>
  )
}
