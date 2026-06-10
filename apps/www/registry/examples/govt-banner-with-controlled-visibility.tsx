"use client"

import { useState } from "react"

import { GovtBanner } from "@opengovsg/oui"

export default function GovtBannerWithControlledVisibility() {
  const [isExpanded, setIsExpanded] = useState(false)

  return <GovtBanner isExpanded={isExpanded} onExpandedChange={setIsExpanded} />
}
