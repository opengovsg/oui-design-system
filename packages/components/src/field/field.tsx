"use client"

import type {
  FieldErrorProps as AriaFieldErrorProps,
  LabelProps as AriaLabelProps,
  GroupProps,
  TextProps,
} from "react-aria-components"
import { useMemo } from "react"
import { CircleAlert } from "lucide-react"
import {
  FieldError as AriaFieldError,
  Label as AriaLabel,
  Group,
  Text,
} from "react-aria-components"

import type {
  DescriptionVariantProps,
  FieldErrorSlots,
  FieldErrorVariantProps,
  LabelVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  composeRenderProps,
  descriptionStyles,
  fieldErrorStyles,
  fieldGroupStyles,
  labelStyles,
} from "@opengovsg/oui-theme"

export interface LabelProps extends AriaLabelProps, LabelVariantProps {}

export function Label({ size, className, ...props }: LabelProps) {
  return <AriaLabel {...props} className={labelStyles({ className, size })} />
}

export interface DescriptionProps extends TextProps, DescriptionVariantProps {}

export function Description({ size, className, ...props }: DescriptionProps) {
  return (
    <Text
      slot="description"
      {...props}
      className={descriptionStyles({ className, size })}
    />
  )
}

export interface FieldErrorProps
  extends AriaFieldErrorProps,
    FieldErrorVariantProps {
  classNames?: SlotsToClasses<FieldErrorSlots>
}

export function FieldErrorIcon({
  size,
  className,
}: Pick<FieldErrorProps, "size"> & { className?: string }) {
  const styles = fieldErrorStyles({ size })

  return <CircleAlert className={styles.icon({ className })} />
}

export function FieldError({
  children,
  className,
  size,
  classNames,
  ...props
}: FieldErrorProps) {
  const styles = fieldErrorStyles({ size })

  const childrenFromProps = useMemo(() => {
    if (typeof children === "string") {
      return (
        <>
          <FieldErrorIcon className={classNames?.icon} size={size} />
          {children}
        </>
      )
    }
    return children
  }, [children, classNames?.icon, size])

  return (
    <AriaFieldError
      {...props}
      className={composeRenderProps(
        className ?? classNames?.text,
        (className, renderProps) => styles.text({ ...renderProps, className }),
      )}
    >
      {childrenFromProps}
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
