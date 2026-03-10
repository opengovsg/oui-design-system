import { Infobox } from "@opengovsg/oui"

export default function InfoboxSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Infobox size="sm">
        Small infobox with compact spacing and smaller icon.
      </Infobox>
      <Infobox size="md">
        Medium infobox with comfortable spacing and larger icon.
      </Infobox>
    </div>
  )
}
