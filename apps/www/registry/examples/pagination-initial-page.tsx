"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationInitialPage() {
  return <Pagination color="warning" initialPage={3} total={10} />
}
