"use client"

import { Button, Tooltip, TooltipTrigger } from "@opengovsg/oui"
import { useState } from "react"

export default function TooltipControlled() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <TooltipTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button>Trigger</Button>
        <Tooltip>Controlled tooltip</Tooltip>
      </TooltipTrigger>
      <p className="text-base-content-medium text-sm">
        Tooltip is {isOpen ? "open" : "closed"}
      </p>
    </div>
  )
}
