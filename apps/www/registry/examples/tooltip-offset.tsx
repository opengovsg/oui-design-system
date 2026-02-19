import { Button, Tooltip, TooltipTrigger } from "@opengovsg/oui"

export default function TooltipOffset() {
  return (
    <div className="flex flex-wrap gap-6">
      <TooltipTrigger>
        <Button variant="outline">Default offset (10)</Button>
        <Tooltip>Default offset</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline">Offset 0</Button>
        <Tooltip offset={0}>No offset</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline">Offset 20</Button>
        <Tooltip offset={20}>Larger offset</Tooltip>
      </TooltipTrigger>
    </div>
  )
}
