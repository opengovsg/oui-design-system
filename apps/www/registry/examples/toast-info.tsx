"use client"

import { Button, toast, Toaster } from "@opengovsg/oui"

export default function ToastInfo() {
  return (
    <>
      <Toaster />
      <Button onPress={() => toast.info("Email is already registered")}>
        Show info toast
      </Button>
    </>
  )
}
