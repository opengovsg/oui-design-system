"use client"

import { Button, toast, Toaster } from "@opengovsg/oui"

export default function ToastDemo() {
  return (
    <>
      <Toaster />
      <Button onPress={() => toast("This is a toast message")}>
        Show toast
      </Button>
    </>
  )
}
