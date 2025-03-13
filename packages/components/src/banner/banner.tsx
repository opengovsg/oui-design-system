"use client"

import type { ReactNode } from "react"
import type { AriaDisclosureProps, LocalizedStrings } from "react-aria"
import { useMemo, useRef } from "react"
import { AlertCircleIcon, InfoIcon, XIcon } from "lucide-react"
import { useDisclosure, useMessageFormatter } from "react-aria"
import { useDisclosureState } from "react-stately"

import type {
  BannerSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { bannerStyles } from "@opengovsg/oui-theme"

import { Button } from "../button"

interface BannerProps
  extends VariantProps<typeof bannerStyles>,
    AriaDisclosureProps {
  /**
   * The banner start content. Will default to the relevant icons based on the `variant` prop.
   */
  startContent?: React.ReactNode
  children: ReactNode
  /**
   * If provided, the dismiss button will be rendered.
   */
  isDismissable?: boolean
  className?: string
  classNames?: SlotsToClasses<BannerSlots>
}

const i18nStrings: LocalizedStrings = {
  "en-SG": {
    dismiss: "Close banner",
  },
  "zh-SG": {
    dismiss: "关闭横幅",
  },
  "ms-SG": {
    dismiss: "Tutup sepanduk",
  },
  "ta-SG": {
    dismiss: "உடைகளை மூடுங்கள்",
  },
}

export const Banner = ({
  variant = "info",
  size,
  children,
  isDismissable,
  startContent: startContentProp,
  className,
  classNames,
  defaultExpanded = true,
  ...disclosureProps
}: BannerProps) => {
  const formatMessage = useMessageFormatter(i18nStrings)

  const styles = bannerStyles({ variant, size })

  const startContent = useMemo(() => {
    if (startContentProp) {
      return startContentProp
    }
    switch (variant) {
      case "info":
        return (
          <InfoIcon className={styles.icon({ className: classNames?.icon })} />
        )
      case "warning":
      case "error":
        return (
          <AlertCircleIcon
            className={styles.icon({ className: classNames?.icon })}
          />
        )
    }
  }, [classNames?.icon, startContentProp, styles, variant])

  const bannerRef = useRef<HTMLDivElement>(null)
  const state = useDisclosureState({
    defaultExpanded,
  })
  const { buttonProps, panelProps: bannerProps } = useDisclosure(
    disclosureProps,
    state,
    bannerRef,
  )

  if (!state.isExpanded) {
    return null
  }

  return (
    <div
      className={styles.base({ className: className ?? classNames?.base })}
      ref={bannerRef}
      {...(isDismissable ? bannerProps : {})}
    >
      <div className={styles.content({ className: classNames?.content })}>
        <div
          className={styles.startContentWrapper({
            className: classNames?.startContentWrapper,
          })}
        >
          {startContent}
        </div>
        <div
          className={styles.childrenWrapper({
            className: classNames?.childrenWrapper,
          })}
        >
          {children}
        </div>
      </div>
      {isDismissable && (
        <Button
          size="xs"
          variant="clear"
          color="neutral"
          isIconOnly
          aria-label={formatMessage("dismiss")}
          className={styles.dismissButton({
            className: classNames?.dismissButton,
          })}
          {...buttonProps}
        >
          <XIcon />
        </Button>
      )}
    </div>
  )
}
