"use client"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionSizes() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <p className="text-base-content-medium mb-2 text-sm">Small</p>
        <Accordion size="sm">
          <AccordionItem>
            <AccordionHeader>Small accordion item</AccordionHeader>
            <AccordionContent>
              This is a small sized accordion with compact spacing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="text-base-content-medium mb-2 text-sm">
          Medium (Default)
        </p>
        <Accordion size="md">
          <AccordionItem>
            <AccordionHeader>Medium accordion item</AccordionHeader>
            <AccordionContent>
              This is a medium sized accordion with default spacing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
