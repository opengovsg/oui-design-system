"use client"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionDefaultExpanded() {
  return (
    <Accordion>
      <AccordionItem defaultExpanded>
        <AccordionHeader>This item is expanded by default</AccordionHeader>
        <AccordionContent>
          You can set an accordion item to be expanded by default using the
          defaultExpanded prop.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>This item is collapsed by default</AccordionHeader>
        <AccordionContent>
          This content is hidden until you click on the header.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
