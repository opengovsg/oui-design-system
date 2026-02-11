import type {
  LinkProps as AriaLinkProps,
  RenderProps,
} from "react-aria-components"
import { Link as AriaLink, composeRenderProps } from "react-aria-components"

import type { LinkVariantProps } from "@opengovsg/oui-theme"
import { linkStyles } from "@opengovsg/oui-theme"

import { renderChildren } from "../system/react-utils/children"
import { mapPropsVariants } from "../system/utils"

interface LinkProps extends AriaLinkProps, LinkVariantProps {
  startContent?: RenderProps<LinkProps>["children"]
  endContent?: RenderProps<LinkProps>["children"]
}

export function Link(originalProps: LinkProps) {
  const [{ children, startContent, endContent, ...props }, variantProps] =
    mapPropsVariants(originalProps, linkStyles.variantKeys)
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        linkStyles({ ...variantProps, className, ...renderProps }),
      )}
    >
      {(renderProps) => (
        <>
          {renderChildren(renderProps, startContent)}
          {renderChildren(renderProps, children)}
          {renderChildren(renderProps, endContent)}
        </>
      )}
    </AriaLink>
  )
}
