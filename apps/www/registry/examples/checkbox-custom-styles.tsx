"use client"

import { Badge, Checkbox } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"
import { useState } from "react"

export default function CheckboxCustomStyles() {
  const [isSelected, setIsSelected] = useState(false)

  const user = {
    name: "Test Person",
    role: "Software Engineer",
    status: "Active",
  }

  return (
    <Checkbox
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex w-full max-w-md",
          "items-center justify-start bg-interaction-neutral-subtle-default",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-interaction-main-default",
        ),
      }}
      isSelected={isSelected}
      onChange={setIsSelected}
    >
      <div className="flex w-full justify-between gap-2">
        {user.name}
        <div className="flex flex-col items-end gap-1">
          <span className="prose-caption-1">{user.role}</span>
          <Badge color="success" size="sm" variant="outline">
            {user.status}
          </Badge>
        </div>
      </div>
    </Checkbox>
  )
}
