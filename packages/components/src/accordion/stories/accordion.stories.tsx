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
    <AccordionItem id="item-1">
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
    <AccordionItem id="item-2">
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
    defaultExpandedKeys: ["item-1", "item-2"],
  },
  render: MultipleTemplate,
}

export const DefaultExpanded: Story = {
  render: (args) => (
    <Accordion {...args} defaultExpandedKeys={["test"]}>
      <AccordionItem id="test">
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
  ),
}
