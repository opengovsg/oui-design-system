import { Button } from "@opengovsg/oui"
import { Loader } from "lucide-react"

export default function ButtonWithDisabled() {
  return (
    <Button isPending spinner={<Loader />}>
      Button
    </Button>
  )
}
