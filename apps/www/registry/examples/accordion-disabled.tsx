"use client"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionDisabled() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader>This item is enabled</AccordionHeader>
        <AccordionContent>
          You can click on this item to expand and collapse it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem isDisabled>
        <AccordionHeader>This item is disabled</AccordionHeader>
        <AccordionContent>
          You cannot interact with this item because it is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Another enabled item</AccordionHeader>
        <AccordionContent>
          This item is also interactive and can be expanded.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
