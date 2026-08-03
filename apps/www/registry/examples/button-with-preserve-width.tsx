"use client"

import { Button } from "@opengovsg/oui"
import { User2Icon } from "lucide-react"
import { useState } from "react"

export default function ButtonWithPreserveWidth() {
  const [preserveWidth, setPreserveWidth] = useState(true)

  return (
    <div className="flex flex-col items-start gap-4">
      <Button
        size="xs"
        variant="outline"
        onPress={() => setPreserveWidth((prev) => !prev)}
      >
        Toggle preserveWidth (currently {preserveWidth ? "true" : "false"})
      </Button>
      <div className="flex flex-row items-center gap-4">
        <Button isPending preserveWidth={preserveWidth}>
          Submit form
        </Button>
        <Button
          isPending
          preserveWidth={preserveWidth}
          startContent={<User2Icon />}
        >
          Submit form
        </Button>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button preserveWidth={preserveWidth}>Submit form</Button>
        <Button preserveWidth={preserveWidth} startContent={<User2Icon />}>
          Submit form
        </Button>
      </div>
    </div>
  )
}
