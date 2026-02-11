"use client"

import { Breadcrumb, Breadcrumbs } from "@opengovsg/oui"

export default function BreadcrumbsTruncatedNoDropdown() {
  return (
    <Breadcrumbs itemsBeforeTruncate={1} renderTruncate={null}>
      <Breadcrumb href="#">Home</Breadcrumb>
      <Breadcrumb href="#">Category</Breadcrumb>
      <Breadcrumb href="#">Subcategory A</Breadcrumb>
      <Breadcrumb onPress={() => alert("Subcategory B pressed")}>
        Subcategory B
      </Breadcrumb>
      <Breadcrumb href="#">Subcategory C</Breadcrumb>
      <Breadcrumb>Current Page</Breadcrumb>
    </Breadcrumbs>
  )
}
