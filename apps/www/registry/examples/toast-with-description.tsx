"use client"

import { Button, toast, Toaster } from "@opengovsg/oui"

export default function ToastWithDescription() {
  return (
    <>
      <Toaster />
      <Button
        onPress={() =>
          toast("Post updated", {
            description: "Your post has been successfully updated.",
          })
        }
      >
        Show toast
      </Button>
    </>
  )
}
