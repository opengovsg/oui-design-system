import { Badge } from "@opengovsg/oui"

export default function BadgeCustomStyles() {
  return (
    <Badge
      classNames={{
        base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
      variant="solid"
      radius="full"
    >
      New
    </Badge>
  )
}
