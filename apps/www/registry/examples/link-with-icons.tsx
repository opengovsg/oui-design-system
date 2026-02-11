"use client"

import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

import { Link } from "@opengovsg/oui"

export default function LinkWithIcons() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="inline">
        This is a paragraph with an inline icon link:{" "}
        <Link href="#">
          <ExternalLinkIcon className="mr-0.5 mb-1 size-4" />
          External link
        </Link>
        , and this should flow naturally, since all children of Link are inline
        by default. Sizing and alignment of the start/endContent should be
        handled by you manually.
      </p>
      <p>
        <Link href="#">
          Continue
          <ArrowRightIcon className="mb-0.5 ml-0.5 size-4" />
        </Link>
        , which is a link with an icon at the end. Check out the code to see the
        custom styles on the icons.
      </p>
    </div>
  )
}
