"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationDisabled() {
  return <Pagination isDisabled initialPage={1} total={10} />
}
