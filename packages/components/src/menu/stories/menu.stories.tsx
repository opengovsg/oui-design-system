import type { Meta, StoryObj } from "@storybook/react-vite"
import { MoreHorizontal } from "lucide-react"
import { useRef, useState } from "react"
import type { Selection } from "react-aria-components"
import { MenuTrigger, SubmenuTrigger } from "react-aria-components"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "../../button"
import type { MenuProps } from "../menu"
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
 * Regression test for a flip-on-open bug: the menu collection populates only
 * after react-aria's first positioning pass, and animating the positioned
 * overlay corrupted react-aria's re-measurement, so the menu stayed clamped
 * below the trigger until a later resize. OUI's `Popover` animates an inner
 * wrapper instead, leaving the measured overlay animation-free so it flips on
 * open. Note this reproduces in async-rendering environments (real browsers /
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

/**
 * A trigger pinned near the bottom edge of a bounded scroll container (passed as
 * `boundaryElement`/`scrollRef`). The menu must flip above the trigger and stay
 * within the container on open — not render below, collapse to ~0 height, and
 * only flip after a resize.
 */
export const BoundedContainerFlip: Story = {
  render: function BoundedContainerFlipStory(args) {
    const [boundary, setBoundary] = useState<HTMLElement | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    return (
      <div
        data-testid="scroll-container"
        ref={(el) => {
          scrollRef.current = el
          setBoundary(el)
        }}
        style={{
          height: 240,
          width: 280,
          overflowY: "auto",
          border: "1px solid #ccc",
          position: "relative",
        }}
      >
        {/* Spacer to push the trigger near the bottom of the container */}
        <div style={{ height: 200 }} />
        <MenuTrigger>
          <Button
            isIconOnly
            aria-label="File options"
            variant="outline"
            className="px-2"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
          {boundary && (
            <Menu {...args} boundaryElement={boundary} scrollRef={scrollRef}>
              <MenuItem id="new">New…</MenuItem>
              <MenuItem id="open">Open…</MenuItem>
              <MenuItem id="save">Save</MenuItem>
            </Menu>
          )}
        </MenuTrigger>
        {/* Spacer so the container is actually scrollable */}
        <div style={{ height: 200 }} />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!)

    const trigger = canvas.getByRole("button", { name: /file options/i })
    await userEvent.click(trigger)

    const menu = await canvas.findByRole("menu")

    await waitFor(() => {
      const menuRect = menu.getBoundingClientRect()
      const triggerRect = trigger.getBoundingClientRect()

      // The menu renders at its real height and flips above the trigger on open
      // rather than collapsing below it.
      expect(menuRect.height).toBeGreaterThan(0)
      expect(menuRect.bottom).toBeLessThanOrEqual(triggerRect.top + 1)
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
