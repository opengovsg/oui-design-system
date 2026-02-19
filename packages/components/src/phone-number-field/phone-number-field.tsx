"use client"

import { phoneNumberFieldStyles, VariantProps } from "@opengovsg/oui-theme"

interface PhoneNumberFieldProps extends VariantProps<typeof phoneNumberFieldStyles> {}

export const PhoneNumberField = ({  }: PhoneNumberFieldProps) => {
  return (
    <div>
      <h1>PhoneNumberField</h1>
    </div>
  )
}
