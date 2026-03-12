"use client"

import { SearchIcon } from "lucide-react"

import { Button, SearchField } from "@opengovsg/oui"

export default function SearchFieldWithActionElement() {
  return (
    <SearchField
      label="Search"
      classNames={{
        fieldWrapper: "gap-1",
      }}
      actionElement={
        <Button
          size="md"
          aria-label="Search"
          onPress={() => alert("Search button clicked")}
        >
          <SearchIcon />
          Search
        </Button>
      }
    />
  )
}
