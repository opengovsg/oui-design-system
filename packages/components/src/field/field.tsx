"use client"

import { CircleAlert } from "lucide-react"
import {
  FieldError as AriaFieldError,
  FieldErrorProps as AriaFieldErrorProps,
  Label as AriaLabel,
  LabelProps as AriaLabelProps,
  Group,
  GroupProps,
  Text,
  TextProps,
} from "react-aria-components"

import {
  composeRenderProps,
  descriptionStyles,
  DescriptionVariantProps,
  FieldErrorSlots,
  fieldErrorStyles,
  FieldErrorVariantProps,
  fieldGroupStyles,
  labelStyles,
  LabelVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"

export interface LabelProps extends AriaLabelProps, LabelVariantProps {}

export function Label({ size, className, ...props }: LabelProps) {
  return <AriaLabel {...props} className={labelStyles({ className, size })} />
}

export interface DescriptionProps extends TextProps, DescriptionVariantProps {}

export function Description({ size, className, ...props }: DescriptionProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={descriptionStyles({ className, size })}
    />
  )
}

export interface FieldErrorProps
  extends AriaFieldErrorProps,
    FieldErrorVariantProps {
  classNames?: SlotsToClasses<FieldErrorSlots>
}

export function FieldError({
  children,
  className,
  size,
  classNames,
  ...props
}: FieldErrorProps) {
  const styles = fieldErrorStyles({ size })

  if (!children) return null

  return (
    <AriaFieldError
      {...props}
      className={composeRenderProps(
        className ?? classNames?.text,
        (className, renderProps) => styles.text({ ...renderProps, className }),
      )}
    >
      <>
        <CircleAlert className={styles.icon({ className: classNames?.icon })} />
        {children}
      </>
    </AriaFieldError>
  )
}

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  )
}
