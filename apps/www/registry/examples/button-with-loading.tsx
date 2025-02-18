import { Button } from "@opengovsg/oui"

export default function ButtonWithLoading() {
  return (
    <div className="flex flex-row gap-4">
      <Button isPending>Button</Button>
      <Button isPending loadingText="Loading...">
        Button
      </Button>
    </div>
  )
}
