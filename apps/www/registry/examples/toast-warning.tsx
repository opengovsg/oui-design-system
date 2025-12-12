"use client"

import { Button, toast, Toaster } from "@opengovsg/oui"

export default function ToastWarning() {
  return (
    <>
      <Toaster />
      <Button onPress={() => toast.warning("Please review your input")}>
        Show warning toast
      </Button>
    </>
  )
}
