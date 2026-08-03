"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { Button, DateField } from "@opengovsg/oui"
import { Form } from "react-aria-components"

export default function DateFieldMinMax() {
  return (
    <Form className="flex w-full flex-col gap-4">
      <DateField
        defaultValue={today(getLocalTimeZone()).subtract({ days: 1 })}
        minValue={today(getLocalTimeZone())}
        label="Min date"
      />
      <DateField
        defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
        label="Max date"
        maxValue={today(getLocalTimeZone())}
      />
      <Button className="w-fit" type="submit">
        Submit
      </Button>
    </Form>
  )
}
