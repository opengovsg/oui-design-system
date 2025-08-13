"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationBoundaries() {
  return (
    <div className="flex flex-col gap-5">
      <p>1 Boundary (default)</p>
      <Pagination color="warning" total={10} />
      <p>2 Boundaries</p>
      <Pagination boundaries={2} color="warning" total={10} />
      <p>3 Boundaries</p>
      <Pagination boundaries={3} color="warning" total={10} />
    </div>
  )
}
