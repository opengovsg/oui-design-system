"use client"

import { useState } from "react"

import { Button } from "@opengovsg/oui"

export default function ButtonWithPreserveWidth() {
  const [isPending, setIsPending] = useState(true)

  return (
    <div className="flex flex-col items-start gap-4">
      <Button
        size="xs"
        variant="outline"
        onPress={() => setIsPending((p) => !p)}
      >
        Toggle pending
      </Button>
      <div className="flex flex-row items-center gap-4">
        <Button isPending={isPending}>Submit form</Button>
        <Button isPending={isPending} preserveWidth>
          Submit form
        </Button>
      </div>
    </div>
  )
}
