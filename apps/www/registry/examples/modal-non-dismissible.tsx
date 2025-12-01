"use client"

import { DialogTrigger } from "react-aria-components"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@opengovsg/oui"

export default function ModalNonDismissible() {
  return (
    <DialogTrigger>
      <Button>Open Non-dismissible Modal</Button>
      <Modal isDismissable={false} isKeyboardDismissDisabled>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Non-dismissible Modal</ModalHeader>
              <ModalBody>
                <p>
                  This modal cannot be closed by clicking the overlay or
                  pressing the Escape key. You must use the button below to
                  close it.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="main" onPress={onClose}>
                  I understand
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DialogTrigger>
  )
}
