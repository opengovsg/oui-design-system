import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { DialogTrigger } from "react-aria-components"

import { Button } from "../../button"
import { Modal } from "../modal"
import { ModalBody } from "../modal-body"
import { ModalContent } from "../modal-content"
import { ModalFooter } from "../modal-footer"
import { ModalHeader } from "../modal-header"

type Story = StoryObj<typeof Modal>

const loremIpsums = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.",
  "Praesent malesuada mi non neque cursus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non dignissim augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In eget fermentum risus. Donec ac metus id sem pharetra tempor a sit amet orci. Fusce id enim in odio consectetur mollis.",
  "Sed ut fringilla enim, venenatis venenatis neque. In iaculis quam at tempor pharetra. Etiam quis luctus quam. Donec varius laoreet augue non lobortis. Suspendisse potenti. In non tellus eu leo fermentum hendrerit at quis sem. Suspendisse eget mauris purus. In faucibus quam sit amet arcu mollis pulvinar. Cras id tortor a purus tristique viverra.",
  "Quisque a convallis purus. Quisque id tellus eget ante molestie blandit eget eget leo. Pellentesque gravida sem nibh. Donec at pharetra massa. Vestibulum auctor nibh feugiat iaculis finibus. Proin lacinia condimentum felis, sed congue augue hendrerit ac. Nullam feugiat gravida ipsum, bibendum porta felis accumsan quis. Duis maximus hendrerit efficitur. Phasellus neque mauris, sodales et pharetra at, faucibus sed ante. Vivamus efficitur, arcu in mollis venenatis, est augue ultrices nisl, ultrices iaculis libero arcu ut eros. Aenean finibus ornare sem id gravida. Nullam accumsan quis arcu sed aliquet. Ut a augue in ante lobortis venenatis eget quis lacus. Vestibulum libero ligula, feugiat eu felis id, scelerisque facilisis felis. Donec egestas risus a nunc fringilla, quis porttitor magna pellentesque.",
  "Praesent hendrerit, velit bibendum feugiat venenatis, tortor enim dapibus urna, et tincidunt sapien dolor eu mauris. Fusce a sodales nisl. Donec sit amet orci consequat massa condimentum maximus id in ante. Quisque vel consectetur nulla, vel iaculis eros. Phasellus posuere purus tortor, ultricies aliquet nulla viverra id. Sed sed magna libero. Aliquam sit amet lobortis nisl. Suspendisse posuere facilisis diam, sit amet egestas odio sollicitudin sed. ]",
]

const Template = ({
  content,
  ...args
}: Story["args"] & { content: string[] }) => {
  return (
    <DialogTrigger>
      <Button>Open Modal</Button>
      <Modal {...args}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalBody>
                {content.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="critical" variant="reverse" onPress={onClose}>
                  Close
                </Button>
                <Button color="main" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DialogTrigger>
  )
}

export default {
  title: "Components/Modal",
  component: Modal,
  render: (args) => <Template {...args} content={loremIpsums.slice(0, 3)} />,
  subcomponents: {
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
  },
  play: async ({ canvas, userEvent }) => {
    const button = await canvas.findByRole("button", {
      name: /open modal/i,
    })
    await userEvent.click(button)
  },
  args: {
    scrollBehavior: "normal",
  },
  argTypes: {
    overlay: {
      control: { type: "radio" },
      options: ["opaque", "blur", "transparent"],
      description: "Determines the style of the modal overlay.",
      table: {
        type: { summary: '"opaque" | "blur" | "transparent"' },
      },
    },
    placement: {
      control: { type: "radio" },
      options: [
        "auto",
        "center",
        "top",
        "top-center",
        "bottom",
        "bottom-center",
      ],
      description: "Determines the placement of the modal dialog.",
      table: {
        type: {
          summary:
            '"auto" | "center" | "top" | "top-center" | "bottom" | "bottom-center"',
        },
      },
    },
    size: {
      control: { type: "radio" },
      options: ["default", "mobile", "full"],
      description: "Determines the size of the modal dialog.",
      table: {
        type: { summary: '"default" | "mobile" | "full"' },
      },
    },
    scrollBehavior: {
      control: { type: "radio" },
      options: ["inside", "outside", "normal"],
      description:
        "Determines whether the scroll behavior is applied to the modal body or the entire modal dialog.",
      table: {
        type: { summary: '"inside" | "outside" | "normal' },
      },
    },
  },
} as Meta<typeof Modal>

export const Default: Story = {
  args: {},
}

export const SizeMobile: Story = {
  args: {
    size: "mobile",
  },
}

export const SizeFull: Story = {
  args: {
    size: "full",
  },
}

export const TransparentOverlay: Story = {
  args: {
    overlay: "transparent",
  },
}

export const PlacementBottomCenter: Story = {
  args: {
    placement: "bottom-center",
  },
  render: (args) => <Template {...args} content={loremIpsums.slice(0, 1)} />,
}

export const Controlled: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  {loremIpsums.slice(0, 3).map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="critical" variant="reverse" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="main" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
  },
}
