import { Button } from "@opengovsg/oui"

export default function ButtonWithRadius() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="shrink-0" radius="default">
        Default
      </Button>
      <Button className="shrink-0" radius="none">
        None
      </Button>
      <Button className="shrink-0" radius="sm">
        Rounded sm
      </Button>
      <Button className="shrink-0" radius="md">
        Rounded md
      </Button>
      <Button className="shrink-0" radius="lg">
        Rounded lg
      </Button>
      <Button className="shrink-0" radius="full">
        Rounded full
      </Button>
    </div>
  )
}
