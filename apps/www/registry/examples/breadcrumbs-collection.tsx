"use client"

import { Breadcrumb, Breadcrumbs } from "@opengovsg/oui"

export default function BreadcrumbsCollection() {
  const items = [
    { id: "home", href: "#", children: "Home" },
    { id: "category", href: "#", children: "Category" },
    { id: "subcategory", href: "#", children: "Subcategory" },
    { id: "current-page", children: "Current Page" },
  ]

  return (
    // @ts-expect-error: Generic type inference issue
    <Breadcrumbs items={items}>
      {(item) => <Breadcrumb>{item.children}</Breadcrumb>}
    </Breadcrumbs>
  )
}
