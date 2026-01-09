"use client"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionMultipleExpanded() {
  return (
    <Accordion allowsMultipleExpanded>
      <AccordionItem>
        <AccordionHeader>Can multiple items be open?</AccordionHeader>
        <AccordionContent>
          Yes! With the allowsMultipleExpanded prop, you can expand multiple
          accordion items at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>How does it work?</AccordionHeader>
        <AccordionContent>
          Simply add the allowsMultipleExpanded prop to the Accordion component
          to enable this behavior.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Try expanding all items</AccordionHeader>
        <AccordionContent>
          Click on all the headers and see how multiple sections can remain open
          simultaneously.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
