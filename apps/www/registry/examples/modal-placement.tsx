"use client"

import { useState } from "react"
import { DialogTrigger } from "react-aria-components"

import type { ModalProps } from "@opengovsg/oui"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@opengovsg/oui"

export default function ModalPlacement() {
  const [modalPlacement, setModalPlacement] =
    useState<ModalProps["placement"]>("auto")

  const placements: ModalProps["placement"][] = [
    "auto",
    "top",
    "bottom",
    "center",
    "top-center",
    "bottom-center",
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-10">
      <div className="flex flex-wrap gap-2">
        {placements.map((placement) => (
          <Button
            key={placement}
            size="sm"
            variant={modalPlacement === placement ? "solid" : "outline"}
            onPress={() => setModalPlacement(placement)}
          >
            {placement}
          </Button>
        ))}
      </div>
      <DialogTrigger>
        <Button>Open Modal</Button>
        <Modal placement={modalPlacement}>
          <ModalContent>
            {(onClose) => (
              <>
                <div className="flex h-[160px] items-center justify-center bg-blue-100">
                  <p>Some picture here</p>
                </div>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="neutral" variant="clear" onPress={onClose}>
                    Maybe later
                  </Button>
                  <Button color="main" onPress={onClose}>
                    Learn more
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </DialogTrigger>
    </div>
  )
}
