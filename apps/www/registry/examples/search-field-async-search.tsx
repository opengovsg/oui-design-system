"use client"

import { SearchField } from "@opengovsg/oui"
import { LoaderCircleIcon } from "lucide-react"

export default function SearchFieldAsyncSearch() {
  return (
    <SearchField
      label="Async search"
      defaultValue="Searching..."
      isReadOnly={true}
      clearIcon={
        <LoaderCircleIcon className="animate-spin" aria-label="Loading" />
      }
    />
  )
}
