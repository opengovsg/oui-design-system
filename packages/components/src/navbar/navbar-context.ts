"use client"

import { createContext } from "../system/react-utils"
import type { UseNavbarReturn } from "./use-navbar"

export const [NavbarProvider, useNavbarContext] =
  createContext<UseNavbarReturn>({
    name: "NavbarContext",
    strict: true,
    errorMessage:
      "useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />",
  })
