import type { Meta, StoryObj } from "@storybook/react-vite"
import { Info } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "../accordion"

const Template = (args: Story["args"]) => (
  <Accordion {...args}>
    <AccordionItem>
      <AccordionHeader startContent={<Info />}>
        What happens if I lose my Secret Key?
      </AccordionHeader>
      <AccordionContent>
        If your form is live, duplicate your form, save the new secret key
        securely and replace the original form’s link with the new form’s link
        to continue collecting responses. Deactivate the original form as soon
        as possible to avoid losing further responses.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export default {
  title: "Components/Accordion",
  component: Accordion,
} as Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>
export const Default: Story = {
  args: {},
  render: Template,
}

const MultipleTemplate = (args: Story["args"]) => (
  <Accordion {...args}>
    <AccordionItem>
      <AccordionHeader startContent={<Info />}>
        What happens if I lose my Secret Key?
      </AccordionHeader>
      <AccordionContent>
        If your form is live, duplicate your form, save the new secret key
        securely and replace the original form’s link with the new form’s link
        to continue collecting responses. Deactivate the original form as soon
        as possible to avoid losing further responses.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader startContent={<Info />}>
        Excel responses from table style questions are clumped into one line,
        how do I separate them?
      </AccordionHeader>
      <AccordionContent>Files content</AccordionContent>
    </AccordionItem>
  </Accordion>
)

export const WithStartContent: Story = {
  render: MultipleTemplate,
}

export const ExpandMultiple: Story = {
  args: {
    allowsMultipleExpanded: true,
  },
  render: MultipleTemplate,
}
