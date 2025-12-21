import { Infobox } from "@opengovsg/oui"

export default function InfoboxVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Infobox variant="info">
        Informational message with helpful tips or guidance.
      </Infobox>
      <Infobox variant="warning">
        Warning message to alert users about potential issues.
      </Infobox>
      <Infobox variant="error">
        Error message indicating something went wrong.
      </Infobox>
      <Infobox variant="success">
        Success message confirming an action was completed.
      </Infobox>
    </div>
  )
}
