import type { Meta, StoryObj } from "@storybook/react"
import type { Selection } from "react-aria-components"
import { useState } from "react"
import { expect, userEvent, within } from "@storybook/test"
import { MoreHorizontal } from "lucide-react"
import { MenuTrigger, SubmenuTrigger } from "react-aria-components"

import type { MenuProps } from "../menu"
import { Button } from "../../button"
import { Menu, MenuItem, MenuSection, MenuSeparator } from "../menu"

export default {
  title: "Components/Menu",
  component: Menu,
  argTypes: {
    placement: {
      control: {
        type: "select",
      },
      options: [
        "bottom",
        "bottom left",
        "bottom right",
        "bottom start",
        "bottom end",
        "top",
        "top left",
        "top right",
        "top start",
        "top end",
        "left",
        "left top",
        "left bottom",
        "start",
        "start top",
        "start bottom",
        "right",
        "right top",
        "right bottom",
        "end",
        "end top",
        "end bottom",
      ],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md"],
    },
  },
} as Meta<typeof Menu>

type Story = StoryObj<typeof Menu>

const Template = (args: MenuProps<object>) => (
  <MenuTrigger defaultOpen>
    <Button
      isIconOnly
      aria-label="File options"
      variant="outline"
      className="px-2"
    >
      <MoreHorizontal className="h-5 w-5" />
    </Button>
    <Menu {...args}>
      <MenuItem id="new">New…</MenuItem>
      <MenuItem id="open">Open…</MenuItem>
      <MenuSeparator />
      <MenuItem id="save">Save</MenuItem>
      <MenuItem id="saveAs">Save as…</MenuItem>
      <MenuSeparator />
      <MenuItem id="print">Print…</MenuItem>
    </Menu>
  </MenuTrigger>
)

export const Example: Story = {
  render: Template,
}

export const DisabledItems: Story = {
  render: Template,
  args: {
    disabledKeys: ["save"],
  },
}

export const WithSubmenuAndSelection: Story = {
  args: {},
  render: (args) => {
    const [style, setStyle] = useState<Selection>(new Set(["bold", "italic"]))
    const [align, setAlign] = useState<Selection>(new Set(["left"]))
    return (
      <MenuTrigger defaultOpen>
        <Button isIconOnly variant="outline" className="px-2">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
        <Menu {...args}>
          <MenuSection title="Actions">
            <SubmenuTrigger>
              <MenuItem id="open">Open</MenuItem>
              <Menu>
                <MenuItem id="open-new">Open in New Window</MenuItem>
                <MenuItem id="open-current">Open in Current Window</MenuItem>
                <SubmenuTrigger>
                  <MenuItem id="more">More</MenuItem>
                  <Menu>
                    <MenuItem id="open-email">Open in Email Client</MenuItem>
                    <MenuItem id="open-in-alt">
                      Open in Alternative Browser
                    </MenuItem>
                  </Menu>
                </SubmenuTrigger>
              </Menu>
            </SubmenuTrigger>
            <MenuItem>Paste</MenuItem>
          </MenuSection>
          <MenuSection
            selectionMode="multiple"
            selectedKeys={style}
            onSelectionChange={setStyle}
            title="Text style"
          >
            <MenuItem id="bold">Bold</MenuItem>
            <MenuItem id="italic">Italic</MenuItem>
            <MenuItem id="underline">Underline</MenuItem>
          </MenuSection>
          <MenuSection
            selectionMode="single"
            selectedKeys={align}
            onSelectionChange={setAlign}
            title="Text alignment"
          >
            <MenuItem id="left">Left</MenuItem>
            <MenuItem id="center">Center</MenuItem>
            <MenuItem id="right">Right</MenuItem>
          </MenuSection>
        </Menu>
      </MenuTrigger>
    )
  },
  play: ({ canvasElement }) => {
    const screen = canvasElement.parentElement!
    const canvas = within(screen)

    userEvent.click(canvas.getByRole("menuitem", { name: /open/i }))

    expect(
      canvas.findByRole("menuitem", { name: /open in new window/i }),
    ).resolves.toBeInTheDocument()
  },
}

export const WithSubmenuAndSelectionXs: Story = {
  args: {
    size: "xs",
  },
  render: WithSubmenuAndSelection.render,
  play: WithSubmenuAndSelection.play,
}

export const WithSubmenuAndSelectionSm: Story = {
  args: {
    size: "sm",
  },
  render: WithSubmenuAndSelection.render,
  play: WithSubmenuAndSelection.play,
}
