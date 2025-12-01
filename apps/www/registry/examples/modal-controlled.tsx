"use client"

import { useState } from "react"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@opengovsg/oui"

export default function ModalControlled() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Controlled Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Controlled Modal</ModalHeader>
              <ModalBody>
                <p>
                  This modal is controlled programmatically using the{" "}
                  <code>isOpen</code> and <code>onOpenChange</code> props.
                </p>
                <p>Current state: {isOpen ? "Open" : "Closed"}</p>
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
}
