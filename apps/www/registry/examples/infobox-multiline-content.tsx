import { Infobox } from "@opengovsg/oui"

export default function InfoboxMultilineContent() {
  return (
    <div className="flex flex-col gap-4">
      <Infobox variant="info">
        <strong>Pro tip:</strong> You can include formatted content like bold
        text, links, and multiple sentences to provide comprehensive guidance to
        your users.
      </Infobox>
      <Infobox variant="warning">
        <div>
          <strong>Action required:</strong> Your session will expire in 5
          minutes.
          <ul className="mt-2 ml-4 list-disc">
            <li>Save your work to avoid losing changes</li>
            <li>Extend your session if needed</li>
            <li>Log in again if your session expires</li>
          </ul>
        </div>
      </Infobox>
    </div>
  )
}
