"use client"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionHideIndicator() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader hideIndicator>No indicator shown here</AccordionHeader>
        <AccordionContent>
          This accordion item has no indicator icon visible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader hideIndicator>
          Another item without indicator
        </AccordionHeader>
        <AccordionContent>
          You can hide the indicator by setting the hideIndicator prop to true.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
