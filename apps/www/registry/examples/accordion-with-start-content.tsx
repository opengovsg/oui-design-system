"use client"

import { AlertCircle, HelpCircle, Info } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@opengovsg/oui"

export default function AccordionWithStartContent() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader startContent={<Info />}>
          What happens if I lose my Secret Key?
        </AccordionHeader>
        <AccordionContent>
          If your form is live, duplicate your form, save the new secret key
          securely and replace the original form&apos;s link with the new
          form&apos;s link to continue collecting responses. Deactivate the
          original form as soon as possible to avoid losing further responses.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader startContent={<HelpCircle />}>
          How do I reset my password?
        </AccordionHeader>
        <AccordionContent>
          Click on the &quot;Forgot Password&quot; link on the login page and
          follow the instructions sent to your email.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader startContent={<AlertCircle />}>
          What should I do if I encounter an error?
        </AccordionHeader>
        <AccordionContent>
          Please contact our support team with the error details and we will
          assist you as soon as possible.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
