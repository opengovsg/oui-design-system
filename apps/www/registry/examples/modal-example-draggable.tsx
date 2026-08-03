"use client"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDraggable,
} from "@opengovsg/oui"
import { useRef, useState } from "react"
import { DialogTrigger } from "react-aria-components"

export default function ModalExampleDraggable() {
  const [isOpen, onOpen] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen })

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={onOpen}>
      <Button>Open Draggable Modal</Button>
      <Modal animation="fade" ref={targetRef}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps}>Draggable Modal</ModalHeader>
              <ModalBody>
                <p>
                  Drag the modal header to move this modal around the screen.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                </p>
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
