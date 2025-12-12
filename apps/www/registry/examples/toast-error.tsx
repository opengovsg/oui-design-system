"use client"

import { Button, toast, Toaster } from "@opengovsg/oui"

export default function ToastError() {
  return (
    <>
      <Toaster />
      <Button onPress={() => toast.error("Something went wrong")}>
        Show error toast
      </Button>
    </>
  )
}
