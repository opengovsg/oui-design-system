import type { AnchorHTMLAttributes } from "react"

import type { VariantProps } from "@opengovsg/oui-theme"
import { skipNavLinkStyles } from "@opengovsg/oui-theme"

interface SkipNavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "id" | "href">,
    VariantProps<typeof skipNavLinkStyles> {
  /**
   * The id of the element to skip to
   */
  id: string
}

export const SkipNavLink = ({ className, id, ...props }: SkipNavLinkProps) => {
  return (
    <a
      className={skipNavLinkStyles({ className })}
      {...props}
      href={`#${id}`}
    />
  )
}
