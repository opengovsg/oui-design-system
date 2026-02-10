"use client"

import { SearchField } from "@opengovsg/oui"

export default function SearchFieldWithErrorMessage() {
  return (
    <SearchField
      label="Search documents"
      isInvalid
      errorMessage="Please enter a valid search query."
    />
  )
}
