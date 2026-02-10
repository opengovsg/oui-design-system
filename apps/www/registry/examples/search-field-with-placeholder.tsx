"use client"

import { SearchField } from "@opengovsg/oui"

export default function SearchFieldWithPlaceholder() {
  return (
    <SearchField
      label="Search"
      inputProps={{ placeholder: "Search by name or email" }}
    />
  )
}
