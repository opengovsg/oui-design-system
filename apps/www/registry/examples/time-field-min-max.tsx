"use client"

import { Time } from "@internationalized/date"
import { Button, TimeField } from "@opengovsg/oui"
import { Form } from "react-aria-components"

export default function TimeFieldMinMax() {
  return (
    <Form className="flex w-full flex-col gap-4">
      <TimeField
        defaultValue={new Time(8, 0)}
        minValue={new Time(9, 0)}
        label="Min time (9:00 AM)"
      />
      <TimeField
        defaultValue={new Time(18, 0)}
        maxValue={new Time(17, 0)}
        label="Max time (5:00 PM)"
      />
      <Button className="w-fit" type="submit">
        Submit
      </Button>
    </Form>
  )
}
