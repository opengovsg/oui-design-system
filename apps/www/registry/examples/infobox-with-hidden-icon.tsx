import { Infobox } from "@opengovsg/oui"

export default function InfoboxWithHiddenIcon() {
  return (
    <div className="flex flex-col gap-4">
      <Infobox variant="info" icon={null}>
        Text-only infobox without an icon for a cleaner look.
      </Infobox>
      <Infobox variant="warning" icon={null}>
        Sometimes the colored background is sufficient without an icon.
      </Infobox>
    </div>
  )
}
