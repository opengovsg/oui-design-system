"use client"

import { Button, SearchField } from "@opengovsg/oui"
import { SearchIcon } from "lucide-react"

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
