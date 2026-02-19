import { Button, Tooltip, TooltipTrigger } from "@opengovsg/oui"

export default function TooltipDemo() {
  return (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip>This is a tooltip</Tooltip>
    </TooltipTrigger>
  )
}
