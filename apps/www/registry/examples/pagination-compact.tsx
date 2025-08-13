"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationCompact() {
  return <Pagination isCompact initialPage={3} total={100} />
}
