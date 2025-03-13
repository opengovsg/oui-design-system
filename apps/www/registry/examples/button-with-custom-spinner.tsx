import { Loader } from "lucide-react"

import { Button } from "@opengovsg/oui"

export default function ButtonWithDisabled() {
  return (
    <Button isPending spinner={<Loader />}>
      Button
    </Button>
  )
}
