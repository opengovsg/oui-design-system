import { AlertTriangle, Lightbulb } from "lucide-react"

import { Infobox } from "@opengovsg/oui"

export default function InfoboxWithCustomIcon() {
  return (
    <div className="flex flex-col gap-4">
      <Infobox variant="info" icon={<Lightbulb />}>
        Use a custom icon to better match your message content.
      </Infobox>
      <Infobox variant="warning" icon={<AlertTriangle />}>
        Custom icons automatically inherit the variant color and size.
      </Infobox>
    </div>
  )
}
