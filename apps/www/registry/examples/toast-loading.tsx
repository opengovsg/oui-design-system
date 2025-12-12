"use client"

import { Button, toast } from "@opengovsg/oui"

export default function ToastLoading() {
  return (
    <Button onPress={() => toast.loading("Loading...")}>
      Show loading toast
    </Button>
  )
}
