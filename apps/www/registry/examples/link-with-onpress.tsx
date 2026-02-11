"use client"

import { Link } from "@opengovsg/oui"

export default function LinkDisabled() {
  return (
    <Link onPress={() => alert("Pressed link")}>
      Click to trigger onPress event instead of navigation
    </Link>
  )
}
