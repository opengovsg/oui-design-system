"use client"

import { Plus } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionCustomIndicator() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader indicator={<Plus />}>
          Custom plus icon indicator
        </AccordionHeader>
        <AccordionContent>
          This accordion uses a custom plus icon as the indicator instead of the
          default chevron.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader indicator={<Plus />}>
          Another item with plus icon
        </AccordionHeader>
        <AccordionContent>
          The plus icon rotates 180 degrees when expanded, creating a visual
          effect.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
