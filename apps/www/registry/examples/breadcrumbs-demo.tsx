"use client"

import { Home } from "lucide-react"

import { Breadcrumb, Breadcrumbs } from "@opengovsg/oui"

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
