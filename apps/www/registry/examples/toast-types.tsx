"use client"

import { Button, toast } from "@opengovsg/oui"

export default function ToastTypes() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onPress={() => toast("Default toast")}>
        Default
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.success("Successfully saved!")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.error("Something went wrong")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.warning("Please review your input")}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.info("Email is already registered")}
      >
        Info
      </Button>
      <Button variant="outline" onPress={() => toast.loading("Loading...")}>
        Loading
      </Button>
    </div>
  )
}
