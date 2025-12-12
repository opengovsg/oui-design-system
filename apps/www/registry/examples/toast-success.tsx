"use client"

import { Button, toast, Toaster } from "@opengovsg/oui"

export default function ToastSuccess() {
  return (
    <>
      <Toaster />
      <Button onPress={() => toast.success("Successfully saved!")}>
        Show success toast
      </Button>
    </>
  )
}
