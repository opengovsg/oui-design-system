import { Spinner } from "@opengovsg/oui"

export default function SpinnerWithSizes() {
  return (
    <div className="flex flex-row items-end gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}
