"use client"

import type { ForwardedRef } from "react"
import { useContextProps } from "react-aria-components"

import type { OuiListBoxItemProps } from "../list-box"
import { OuiListBoxItem } from "../list-box"
import { forwardRef } from "../system/utils"
import { ComboBoxVariantContext } from "./combo-box-variant-context"

export type ComboBoxItemProps = OuiListBoxItemProps

export const ComboBoxItem = forwardRef(function ComboBoxItem(
  originalProps: ComboBoxItemProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: ForwardedRef<any>,
) {
  ;[originalProps, ref] = useContextProps(
    originalProps,
    ref,
    ComboBoxVariantContext,
  )
  return <OuiListBoxItem ref={ref} {...originalProps} />
})
