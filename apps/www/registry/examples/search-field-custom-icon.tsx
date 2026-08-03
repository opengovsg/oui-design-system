"use client"

import { SearchField } from "@opengovsg/oui"
import { FilterIcon } from "lucide-react"

export default function SearchFieldCustomIcon() {
  return (
    <SearchField
      label="Filter"
      searchIcon={
        <FilterIcon
          aria-hidden
          className="text-base-content-medium ml-4 size-5"
        />
      }
    />
  )
}
