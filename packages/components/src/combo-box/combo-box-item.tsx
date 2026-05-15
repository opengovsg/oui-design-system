"use client"

import type { ForwardedRef } from "react"
import { useContextProps } from "react-aria-components"

import type { ListBoxItemProps } from "../list-box"
import { ListBoxItem } from "../list-box"
import { forwardRef } from "../system/utils"
import { ComboBoxVariantContext } from "./combo-box-variant-context"

export type ComboBoxItemProps = ListBoxItemProps

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
  return <ListBoxItem ref={ref} {...originalProps} />
})
