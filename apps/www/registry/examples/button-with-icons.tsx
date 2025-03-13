import { ArrowRightIcon, MailIcon } from "lucide-react"

import { Button } from "@opengovsg/oui"

export default function ButtonWithIcons() {
  return (
    <div className="flex flex-row items-center gap-4">
      <Button color="neutral" startContent={<MailIcon />}>
        Email
      </Button>
      <Button color="neutral" variant="outline" endContent={<ArrowRightIcon />}>
        Proceed
      </Button>
    </div>
  )
}
