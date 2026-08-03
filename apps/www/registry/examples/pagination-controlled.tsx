"use client"

import { Button, Pagination } from "@opengovsg/oui"
import { useState } from "react"

export default function PaginationControlled() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="flex flex-col gap-5">
      <p className="text-small text-default-500">
        Selected Page: {currentPage}
      </p>
      <Pagination page={currentPage} total={10} onChange={setCurrentPage} />
      <div className="flex gap-2">
        <Button
          color="sub"
          size="sm"
          variant="outline"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          color="sub"
          size="sm"
          variant="outline"
          onPress={() =>
            setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
          }
        >
          Next
        </Button>
      </div>
    </div>
  )
}
