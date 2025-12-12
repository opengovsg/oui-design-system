"use client"

import { Button, toast } from "@opengovsg/oui"

export default function ToastWithDescription() {
  return (
    <Button
      onPress={() =>
        toast("Post updated", {
          description: "Your post has been successfully updated.",
        })
      }
    >
      Show toast
    </Button>
  )
}
