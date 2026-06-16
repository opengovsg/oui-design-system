import type { Meta, StoryObj } from "@storybook/react-vite"
import type { Selection } from "react-aria-components"
import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { MenuTrigger, SubmenuTrigger } from "react-aria-components"
import { expect, userEvent, waitFor, within } from "storybook/test"

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
  parameters: {
    // This option disables all automatic a11y checks on this story,
    // since the transitions are causing false positives
    a11y: { test: "todo" },
  },
} as Meta<typeof Menu>

type Story = StoryObj<typeof Menu>

const Template = (args: MenuProps<object>) => (
  <MenuTrigger>
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
  play: ({ canvas }) => {
    userEvent.click(canvas.getByRole("button", { name: /file options/i }))
  },
}

/**
 * A trigger pinned near the bottom edge of the viewport, with no room below for
 * the menu. The menu must flip above the trigger and remain fully visible
 * instead of opening downwards and being clipped by the viewport.
 *
 * react-aria does not flip on its own here because the menu collection populates
 * only after the first positioning pass; OUI's `Popover` works around it. Note
 * this regression reproduces in async-rendering environments (real browsers /
 * Chromatic); test runners that flush effects synchronously can mask it.
 */
export const ViewportEdgeFlip: Story = {
  render: (args) => (
    <MenuTrigger>
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
        <MenuItem id="save">Save</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  play: async ({ canvasElement }) => {
    const screen = canvasElement.parentElement!
    const canvas = within(screen)

    const trigger = canvas.getByRole("button", { name: /file options/i })
    // Pin the trigger to the bottom edge of the viewport so there is no room
    // below it for the menu — it must flip above.
    const container = trigger.parentElement!
    container.style.position = "fixed"
    container.style.left = "16px"
    container.style.top = `${window.innerHeight - 56}px`
    await userEvent.click(trigger)

    const menu = await canvas.findByRole("menu")

    await waitFor(() => {
      const menuRect = menu.getBoundingClientRect()
      const triggerRect = trigger.getBoundingClientRect()

      // The menu renders with its real content height (it does not collapse).
      expect(menuRect.height).toBeGreaterThan(0)
      // It flips above the trigger...
      expect(menuRect.bottom).toBeLessThanOrEqual(triggerRect.top + 1)
      // ...and stays fully within the viewport.
      expect(menuRect.top).toBeGreaterThanOrEqual(0)
      expect(menuRect.bottom).toBeLessThanOrEqual(window.innerHeight + 1)
    })
  },
}

export const DisabledItems: Story = {
  render: Template,
  args: {
    disabledKeys: ["save"],
  },
  play: ({ canvas }) => {
    userEvent.click(canvas.getByRole("button", { name: /file options/i }))
  },
}

export const WithSubmenuAndSelection: Story = {
  args: {},
  render: (args) => {
    const [style, setStyle] = useState<Selection>(new Set(["bold", "italic"]))
    const [align, setAlign] = useState<Selection>(new Set(["left"]))
    return (
      <MenuTrigger>
        <Button
          isIconOnly
          aria-label="Menu options"
          variant="outline"
          className="px-2"
        >
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
  play: async ({ canvasElement }) => {
    const screen = canvasElement.parentElement!
    const canvas = within(screen)

    userEvent.click(canvas.getByRole("button", { name: /menu options/i }))
    userEvent.click(await canvas.findByRole("menuitem", { name: /open/i }))

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
