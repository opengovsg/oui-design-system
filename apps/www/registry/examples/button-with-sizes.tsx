import { Button } from "@opengovsg/oui"

export default function ButtonWithSizes() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button className="shrink-0" size="xs">
        Button (xs)
      </Button>
      <Button className="shrink-0" size="sm">
        Button (sm)
      </Button>
      <Button className="shrink-0" size="md">
        Button (md)
      </Button>
      <Button className="shrink-0" size="lg">
        Button (lg)
      </Button>
    </div>
  )
}
