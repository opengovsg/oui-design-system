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

export default function ModalDemo() {
  return (
    <DialogTrigger>
      <Button>Open Modal</Button>
      <Modal>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
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
