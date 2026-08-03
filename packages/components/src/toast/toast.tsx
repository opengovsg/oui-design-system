"use client"

import type {
  SlotsToClasses,
  ToastSlots,
  VariantProps,
} from "@opengovsg/oui-theme"
import { toastStyles } from "@opengovsg/oui-theme"
import { X } from "lucide-react"
import type { ToasterProps as BaseToasterProps } from "sonner"
import { Toaster as Sonner } from "sonner"

import { Spinner } from "../spinner"
import { mapPropsVariants } from "../system/utils"

export interface ToasterProps
  extends BaseToasterProps, VariantProps<typeof toastStyles> {
  classNames?: SlotsToClasses<ToastSlots>
}

export function Toaster(originalProps: ToasterProps) {
  const [{ toastOptions, closeButton = true, ...props }, variantProps] =
    mapPropsVariants(originalProps, toastStyles.variantKeys)

  const styles = toastStyles(variantProps)

  return (
    <Sonner
      className={styles.base({
        className: props.className ?? props.classNames?.base,
      })}
      position="top-center"
      icons={{
        loading: <Spinner size="xs" />,
        close: <X />,
      }}
      mobileOffset={8}
      offset={{
        top: 8,
      }}
      closeButton={closeButton}
      toastOptions={{
        classNames: {
          toast: styles.toast({
            className: props.classNames?.toast,
          }),
          title: styles.title({
            className: props.classNames?.title,
          }),
          description: styles.description({
            className: props.classNames?.description,
          }),
          loader: styles.loader({
            className: props.classNames?.loader,
          }),
          closeButton: styles.closeButton({
            className: props.classNames?.closeButton,
          }),
          success: styles.success({
            className: props.classNames?.success,
          }),
          error: styles.error({
            className: props.classNames?.error,
          }),
          info: styles.info({
            className: props.classNames?.info,
          }),
          warning: styles.warning({
            className: props.classNames?.warning,
          }),
          loading: styles.loading({
            className: props.classNames?.loading,
          }),
          default: styles.default({
            className: props.classNames?.default,
          }),
          content: styles.content({
            className: props.classNames?.content,
          }),
          icon: styles.icon({
            className: props.classNames?.icon,
          }),
          actionButton: styles.actionButton({
            className: props.classNames?.actionButton,
          }),
          cancelButton: styles.cancelButton({
            className: props.classNames?.cancelButton,
          }),
        },
        unstyled: true,
        ...toastOptions,
      }}
      {...props}
    />
  )
}

export { toast } from "sonner"
