"use client"

import type { ContextValue } from "react-aria-components"

import type {
  ModalSlots,
  modalStyles,
  ModalVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"

interface ModalVariantContextValue extends ModalVariantProps {
  classNames?: SlotsToClasses<ModalSlots>
  slots: ReturnType<typeof modalStyles>
}

export const [ModalVariantContext, useModalVariantContext] =
  createContext<ModalVariantContextValue>({
    name: "ModalVariantContext",
    strict: true,
  })
