"use client"

import { Pagination } from "@opengovsg/oui"

export default function PaginationCustomStyles() {
  return (
    <Pagination
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded-sm border border-gray-200",
        item: "w-8 h-8 prose-caption-2 rounded-none bg-transparent",
        cursor:
          "bg-linear-to-b shadow-lg from-blue-500 to-blue-800 dark:from-blue-300 dark:to-blue-100 text-white font-bold",
      }}
      total={10}
    />
  )
}
