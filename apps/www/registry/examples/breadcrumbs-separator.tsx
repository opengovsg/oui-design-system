"use client"

import { Breadcrumb, Breadcrumbs } from "@opengovsg/oui"

export default function BreadcrumbsSeparator() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs separator="/">
        <Breadcrumb href="#">Home</Breadcrumb>
        <Breadcrumb href="#">Components</Breadcrumb>
        <Breadcrumb>Breadcrumbs</Breadcrumb>
      </Breadcrumbs>
      <Breadcrumbs separator="|">
        <Breadcrumb href="#">Home</Breadcrumb>
        <Breadcrumb href="#">Components</Breadcrumb>
        <Breadcrumb>Breadcrumbs</Breadcrumb>
      </Breadcrumbs>
    </div>
  )
}
