"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationLoop() {
  return (
    <Pagination loop showControls color="success" initialPage={1} total={5} />
  )
}
