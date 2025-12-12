"use client"

import { Button, toast } from "@opengovsg/oui"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function ToastPromise() {
  const handleSave = () => {
    toast.promise(wait(2000), {
      loading: "Saving changes...",
      success: "Changes saved successfully!",
      error: "Failed to save changes.",
    })
  }

  return <Button onPress={handleSave}>Save changes</Button>
}
