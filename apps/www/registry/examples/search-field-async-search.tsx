"use client"

import { LoaderCircleIcon } from "lucide-react"

import { SearchField } from "@opengovsg/oui"

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
