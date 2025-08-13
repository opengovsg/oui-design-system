"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationColors() {
  const colors = ["main", "neutral", "success", "warning", "critical"] as const

  return (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((color) => (
        <Pagination key={color} color={color} initialPage={1} total={10} />
      ))}
    </div>
  )
}
