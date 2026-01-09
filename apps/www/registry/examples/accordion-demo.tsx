"use client"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionDemo() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader>What is OUI Design System?</AccordionHeader>
        <AccordionContent>
          OUI is a comprehensive design system built for OGP products, providing
          accessible and consistent components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>How do I get started?</AccordionHeader>
        <AccordionContent>
          Install the package using npm, yarn, or pnpm, then import the
          components you need into your React application.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Is it accessible?</AccordionHeader>
        <AccordionContent>
          Yes, all components follow WCAG 2.1 guidelines and include proper ARIA
          attributes for screen readers and keyboard navigation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
