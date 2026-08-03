"use client"

import { PaginationItemType, usePagination } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"
import type { SVGProps } from "react"

const ChevronIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function PaginationHookImplementation() {
  const { activePage, range, setPage, onNext, onPrevious } = usePagination({
    total: 6,
    showControls: true,
    siblings: 10,
    boundaries: 10,
  })

  return (
    <div className="flex flex-col gap-2">
      <p>Active page: {activePage}</p>
      <ul className="flex items-center gap-2">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li key={page} aria-label="next page" className="h-4 w-4">
                <button
                  className="h-full w-full rounded-full bg-gray-200"
                  onClick={onNext}
                >
                  <ChevronIcon className="rotate-180" />
                </button>
              </li>
            )
          }

          if (page === PaginationItemType.PREV) {
            return (
              <li key={page} aria-label="previous page" className="h-4 w-4">
                <button
                  className="h-full w-full rounded-full bg-gray-200"
                  onClick={onPrevious}
                >
                  <ChevronIcon />
                </button>
              </li>
            )
          }

          if (page === PaginationItemType.DOTS) {
            return (
              <li key={page} className="h-4 w-4">
                ...
              </li>
            )
          }

          return (
            <li key={page} aria-label={`page ${page}`} className="h-4 w-4">
              <button
                className={cn(
                  "h-full w-full rounded-full bg-blue-300",
                  activePage === page && "bg-gray-500",
                )}
                onClick={() => setPage(page)}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
