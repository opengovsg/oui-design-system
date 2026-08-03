"use client"

import { GovtBanner } from "@opengovsg/oui"
import { useState } from "react"

export default function GovtBannerWithControlledVisibility() {
  const [isExpanded, setIsExpanded] = useState(false)

  return <GovtBanner isExpanded={isExpanded} onExpandedChange={setIsExpanded} />
}
