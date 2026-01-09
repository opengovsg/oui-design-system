"use client"

import { useState } from "react"
import { Key } from "react-aria-components"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  Button,
} from "@opengovsg/oui"

export default function AccordionControlled() {
  const [expandedItems, setExpandedItems] = useState(new Set<Key>())

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-2">
        <Button size="sm" onPress={() => setExpandedItems(new Set(["1"]))}>
          Expand First
        </Button>
        <Button size="sm" onPress={() => setExpandedItems(new Set(["2"]))}>
          Expand Second
        </Button>
        <Button size="sm" onPress={() => setExpandedItems(new Set())}>
          Collapse All
        </Button>
      </div>

      <Accordion
        expandedKeys={expandedItems}
        onExpandedChange={setExpandedItems}
      >
        <AccordionItem id="1">
          <AccordionHeader>First controlled item</AccordionHeader>
          <AccordionContent>
            This accordion&apos;s expanded state is controlled by the buttons
            above.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="2">
          <AccordionHeader>Second controlled item</AccordionHeader>
          <AccordionContent>
            Click the buttons above to control which items are expanded.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
