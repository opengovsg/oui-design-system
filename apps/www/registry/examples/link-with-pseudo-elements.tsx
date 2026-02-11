"use client"

import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

import { Link } from "@opengovsg/oui"

export default function LinkWithPseudoElements() {
  return (
    <Link href="#" className="before:content-['→_'] after:content-['_↗']">
      See code for this example
    </Link>
  )
}
