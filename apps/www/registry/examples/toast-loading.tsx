"use client"

import { Button, toast, Toaster } from "@opengovsg/oui"

export default function ToastLoading() {
  return (
    <>
      <Toaster />
      <Button onPress={() => toast.loading("Loading...")}>
        Show loading toast
      </Button>
    </>
  )
}
