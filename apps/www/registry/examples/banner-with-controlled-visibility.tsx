"use client"

import { Banner, Button } from "@opengovsg/oui"
import { useState } from "react"

export default function BannerWithControlledVisibility() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="flex flex-1 flex-col gap-4">
      {isExpanded ? (
        <Banner
          isExpanded={isExpanded}
          onExpandedChange={setIsExpanded}
          isDismissable
        >
          Dismiss the banner to hide me!
        </Banner>
      ) : (
        <Button
          size="sm"
          className="w-fit"
          variant="outline"
          onPress={() => setIsExpanded(true)}
        >
          Show Banner
        </Button>
      )}
    </div>
  )
}
