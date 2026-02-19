import { Button, Tooltip, TooltipTrigger } from "@opengovsg/oui"

export default function TooltipCustomStyles() {
  return (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip
        classNames={{
          base: "bg-gradient-to-br from-indigo-500 to-pink-500 text-white border-none px-4 py-2",
          arrow: "fill-indigo-500",
        }}
      >
        Custom styled tooltip
      </Tooltip>
    </TooltipTrigger>
  )
}
