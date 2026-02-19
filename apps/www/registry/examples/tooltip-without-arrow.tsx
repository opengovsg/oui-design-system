import { Button, Tooltip, TooltipTrigger } from "@opengovsg/oui"

export default function TooltipWithoutArrow() {
  return (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip showArrow={false}>Tooltip without arrow</Tooltip>
    </TooltipTrigger>
  )
}
