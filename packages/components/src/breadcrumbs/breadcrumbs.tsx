"use client"

import { breadcrumbsStyles, VariantProps } from "@opengovsg/oui-theme"

interface BreadcrumbsProps extends VariantProps<typeof breadcrumbsStyles> {}

export const Breadcrumbs = ({  }: BreadcrumbsProps) => {
  return (
    <div>
      <h1>breadcrumbs</h1>
    </div>
  )
}
