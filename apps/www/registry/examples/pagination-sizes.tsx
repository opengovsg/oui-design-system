"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationSizes() {
  const sizes = ["sm", "md", "lg"] as const

  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Pagination key={size} initialPage={1} size={size} total={10} />
      ))}
    </div>
  )
}
