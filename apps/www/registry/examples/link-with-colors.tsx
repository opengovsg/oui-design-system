"use client"

import { Link } from "@opengovsg/oui"

export default function LinkWithColors() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="#">Default</Link>
      <Link href="#" color="neutral">
        Neutral
      </Link>
    </div>
  )
}
