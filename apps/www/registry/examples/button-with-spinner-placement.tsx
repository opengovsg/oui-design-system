import { Button } from "@opengovsg/oui"

export default function ButtonWithLoading() {
  return (
    <div className="flex flex-row gap-4">
      <Button spinnerPlacement="start" isPending loadingText="Loading">
        Button
      </Button>
      <Button spinnerPlacement="end" isPending loadingText="Loading">
        Button
      </Button>
    </div>
  )
}
