"use client"

import { Link } from "@opengovsg/oui"

export default function LinkDisabled() {
  return (
    <Link href="#" isDisabled>
      Disabled link
    </Link>
  )
}
