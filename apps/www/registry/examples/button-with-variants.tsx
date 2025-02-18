import { Button } from "@opengovsg/oui"

export default function ButtonWithVariants() {
  return (
    <div className="flex flex-row items-center gap-4">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}
