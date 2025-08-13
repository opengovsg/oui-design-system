"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationVariants() {
  const variants = ["light"] as const

  return (
    <div className="flex flex-wrap items-center gap-4">
      {variants.map((variant) => (
        <Pagination
          key={variant}
          initialPage={1}
          total={10}
          variant={variant}
        />
      ))}
    </div>
  )
}
