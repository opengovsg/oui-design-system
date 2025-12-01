"use client"

import type {
  ModalSlots,
  modalStyles,
  ModalVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"

export interface ModalVariantContextValue extends ModalVariantProps {
  classNames?: SlotsToClasses<ModalSlots>
  slots: ReturnType<typeof modalStyles>
  buttonSize: "md" | "lg"
}

export const [ModalVariantContext, useModalVariantContext] =
  createContext<ModalVariantContextValue>({
    name: "ModalVariantContext",
    strict: true,
  })
