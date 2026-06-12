import { Spinner } from "@opengovsg/oui"

export default function SpinnerWithColors() {
  return (
    <div className="flex flex-row items-center gap-6">
      <Spinner color="current" />
      <div className="flex items-center rounded-md bg-gray-800 p-4">
        <Spinner color="white" />
      </div>
    </div>
  )
}
