"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationSiblings() {
  return (
    <div className="flex flex-col gap-5">
      <p>1 Sibling (default)</p>
      <Pagination total={10} />
      <p>2 Siblings</p>
      <Pagination siblings={2} total={10} />
      <p>3 Siblings</p>
      <Pagination siblings={3} total={10} />
    </div>
  )
}
