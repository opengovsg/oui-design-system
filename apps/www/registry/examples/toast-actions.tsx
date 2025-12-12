"use client"

import { Button, toast } from "@opengovsg/oui"

export default function ToastActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onPress={() =>
          toast.info("New comment on your post!", {
            action: {
              label: "View",
              onClick: () => console.log("Viewed"),
            },
          })
        }
      >
        With Action
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.warning("Are you sure?", {
            action: {
              label: "Confirm",
              onClick: () => console.log("Confirmed"),
            },
            cancel: {
              label: "Cancel",
              onClick: () => console.log("Cancelled"),
            },
          })
        }
      >
        Action + Cancel
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.error("Failed to save", {
            cancel: {
              label: "Dismiss",
              onClick: () => console.log("Dismissed"),
            },
          })
        }
      >
        With Cancel
      </Button>
    </div>
  )
}
