"use client"

import type { PropsWithChildren } from "react"
import { useMemo, useState } from "react"
import { useLayoutEffect } from "@react-aria/utils"
import { UserIcon } from "lucide-react"

import type {
  AvatarSlots,
  AvatarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { avatarStyles, dataAttr } from "@opengovsg/oui-theme"

import type { ImageLoadingStatus } from "./hooks/use-img-loading-status"
import { useDomRef } from "../system/react-utils"
import { forwardRef, mapPropsVariants } from "../system/utils"
import { AvatarContext, useAvatarContext } from "./avatar-context"
import { useImageLoadingStatus } from "./hooks/use-img-loading-status"
import { getInitialsFromText } from "./utils"

export interface AvatarProps extends AvatarVariantProps, PropsWithChildren {
  classNames?: SlotsToClasses<AvatarSlots>
  className?: string
  name?: string
  getInitials?: (name: string) => string
}

export const AvatarRoot = forwardRef<"span", AvatarProps>(
  (originalProps, ref) => {
    const [
      {
        name,
        getInitials = getInitialsFromText,
        classNames,
        className,
        children,
        as,
        ...props
      },
      variantProps,
    ] = mapPropsVariants(originalProps, avatarStyles.variantKeys)

    const domRef = useDomRef(ref)

    const slots = avatarStyles(variantProps)

    const [imageLoadingStatus, setImageLoadingStatus] =
      useState<ImageLoadingStatus>("idle")

    const Component = as || "span"

    return (
      <AvatarContext
        value={{
          imageLoadingStatus,
          setImageLoadingStatus,
          slots,
          classNames,
          getInitials,
          name,
        }}
      >
        <Component
          ref={domRef}
          {...props}
          className={slots.base({ className: className ?? classNames?.base })}
        >
          {children}
        </Component>
      </AvatarContext>
    )
  },
)

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
}

export const AvatarImage = forwardRef<"img", AvatarImageProps>(
  ({ src, as, ...props }, ref) => {
    const domRef = useDomRef(ref)
    const {
      setImageLoadingStatus,
      imageLoadingStatus,
      slots,
      name,
      classNames,
    } = useAvatarContext()

    const currentImageStatus = useImageLoadingStatus(src, props)

    const Component = as || "img"

    useLayoutEffect(() => {
      setImageLoadingStatus(currentImageStatus)
    }, [currentImageStatus, setImageLoadingStatus])

    return (
      <Component
        ref={domRef}
        alt={name}
        data-loaded={dataAttr(imageLoadingStatus === "loaded")}
        {...props}
        src={src}
        className={slots.image({ className: classNames?.image })}
      />
    )
  },
)

export interface AvatarFallbackProps {
  children?: React.ReactNode
}
export const AvatarFallback = forwardRef<"div", AvatarFallbackProps>(
  ({ children, as, ...props }, ref) => {
    const domRef = useDomRef(ref)
    const { slots, classNames, imageLoadingStatus, name, getInitials } =
      useAvatarContext()

    const childrenToRender = useMemo(() => {
      if (children) return children
      if (name) {
        return getInitials(name)
      }
      return (
        <UserIcon className={slots.icon({ className: classNames?.icon })} />
      )
    }, [children, classNames?.icon, getInitials, name, slots])

    const Component = as || "div"

    if (imageLoadingStatus === "loaded") {
      return null
    }

    return (
      <Component
        title={name}
        className={slots.fallback({ className: classNames?.fallback })}
        ref={domRef}
        {...props}
      >
        {childrenToRender}
      </Component>
    )
  },
)
