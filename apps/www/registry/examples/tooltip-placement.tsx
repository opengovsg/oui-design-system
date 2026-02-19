import { Button, Tooltip, TooltipTrigger } from "@opengovsg/oui"

export default function TooltipPlacement() {
  return (
    <div className="flex flex-wrap gap-6">
      <TooltipTrigger>
        <Button variant="outline">Top</Button>
        <Tooltip placement="top">Tooltip on top</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline">Bottom</Button>
        <Tooltip placement="bottom">Tooltip on bottom</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline">Start</Button>
        <Tooltip placement="start">Tooltip on start</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline">End</Button>
        <Tooltip placement="end">Tooltip on end</Tooltip>
      </TooltipTrigger>
    </div>
  )
}
