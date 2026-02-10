"use client"

import { SearchField } from "@opengovsg/oui"

export default function SearchFieldWithLabelAndDescription() {
  return (
    <SearchField
      label="Search documents"
      description="Enter a keyword to search for documents."
    />
  )
}
