import { Spinner } from "@opengovsg/oui"

export default function SpinnerWithCustomStyles() {
  return (
    <Spinner
      size="lg"
      classNames={{
        circle1: "border-b-brand-primary-500",
        circle2: "border-b-brand-secondary-400",
      }}
    />
  )
}
