"use client"

import { SearchField } from "@opengovsg/oui"

export default function SearchFieldSizes() {
  return (
    <div className="flex w-full flex-col gap-4">
      <SearchField label="Search (xs)" size="xs" />
      <SearchField label="Search (sm)" size="sm" />
      <SearchField label="Search (md)" size="md" />
    </div>
  )
}
