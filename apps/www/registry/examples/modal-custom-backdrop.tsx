"use client"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@opengovsg/oui"
import { DialogTrigger } from "react-aria-components"

export default function ModalCustomBackdrop() {
  return (
    <DialogTrigger>
      <Button>Open Modal with Custom Backdrop</Button>
      <Modal
        classNames={{
          overlay: "bg-gradient-to-br from-purple-500/50 to-pink-500/50",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Custom Backdrop</ModalHeader>
              <ModalBody>
                <p>
                  This modal has a custom gradient backdrop applied using the
                  classNames prop.
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
