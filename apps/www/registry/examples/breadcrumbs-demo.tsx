"use client"

import { Breadcrumb, Breadcrumbs } from "@opengovsg/oui"
import { Home } from "lucide-react"

export default function BreadcrumbsDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="#">
        <Home />
        Home
      </Breadcrumb>
      <Breadcrumb href="#">Components</Breadcrumb>
      <Breadcrumb>Breadcrumbs</Breadcrumb>
    </Breadcrumbs>
  )
}
