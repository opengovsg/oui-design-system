"use client"

import type { LinkVariantProps } from "@opengovsg/oui-theme"
import { linkStyles } from "@opengovsg/oui-theme"
import type { LinkProps as AriaLinkProps } from "react-aria-components"
import { Link as AriaLink, composeRenderProps } from "react-aria-components"

import { mapPropsVariants } from "../system/utils"

interface LinkProps extends AriaLinkProps, LinkVariantProps {}

export function Link(originalProps: LinkProps) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    linkStyles.variantKeys,
  )
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        linkStyles({ ...variantProps, className, ...renderProps }),
      )}
    />
  )
}
