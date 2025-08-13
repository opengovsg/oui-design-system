"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationWithControls() {
  return <Pagination showControls initialPage={1} total={10} />
}
