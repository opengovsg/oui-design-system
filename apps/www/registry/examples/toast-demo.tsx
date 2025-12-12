"use client"

import { Button, toast } from "@opengovsg/oui"

export default function ToastDemo() {
  return (
    <Button onPress={() => toast("This is a toast message")}>Show toast</Button>
  )
}
