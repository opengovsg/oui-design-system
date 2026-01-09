"use client"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionDefaultExpanded() {
  return (
    <Accordion defaultExpandedKeys={["item-1"]}>
      <AccordionItem id="item-1">
        <AccordionHeader>This item is expanded by default</AccordionHeader>
        <AccordionContent>
          You can set an accordion item to be expanded by default using the
          defaultExpanded prop.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="item-2">
        <AccordionHeader>This item is collapsed by default</AccordionHeader>
        <AccordionContent>
          This content is hidden until you click on the header.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
