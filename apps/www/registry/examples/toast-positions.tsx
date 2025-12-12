"use client"

import { Button, toast, Toaster } from "@opengovsg/oui"

export default function ToastPositions() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onPress={() => toast("Top left toast", { position: "top-left" })}
          >
            Top Left
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() =>
              toast("Top center toast", { position: "top-center" })
            }
          >
            Top Center
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() => toast("Top right toast", { position: "top-right" })}
          >
            Top Right
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onPress={() =>
              toast("Bottom left toast", { position: "bottom-left" })
            }
          >
            Bottom Left
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() =>
              toast("Bottom center toast", { position: "bottom-center" })
            }
          >
            Bottom Center
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() =>
              toast("Bottom right toast", { position: "bottom-right" })
            }
          >
            Bottom Right
          </Button>
        </div>
      </div>
    </>
  )
}
