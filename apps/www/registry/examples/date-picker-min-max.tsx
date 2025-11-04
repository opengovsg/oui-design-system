"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { Form } from "react-aria-components"

import { Button, DatePicker } from "@opengovsg/oui"

export default function DatePickerMinMax() {
  return (
    <Form className="flex w-full flex-col gap-4">
      <DatePicker
        defaultValue={today(getLocalTimeZone()).subtract({ days: 1 })}
        minValue={today(getLocalTimeZone())}
        calendarProps={{
          isDateUnavailable: (date) => date < today(getLocalTimeZone()),
        }}
        label="Min date"
      />
      <DatePicker
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
