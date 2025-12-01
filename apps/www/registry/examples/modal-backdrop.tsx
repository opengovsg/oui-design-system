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

export default function ModalBackdrop() {
  const overlays = ["blur", "opaque", "transparent"] as const

  return (
    <div className="flex flex-wrap gap-2">
      {overlays.map((overlay) => (
        <DialogTrigger key={overlay}>
          <Button variant="outline">{overlay}</Button>
          <Modal overlay={overlay}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Backdrop: {overlay}</ModalHeader>
                  <ModalBody>
                    <p>
                      This modal uses the <strong>{overlay}</strong> backdrop
                      style.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="critical"
                      variant="reverse"
                      onPress={onClose}
                    >
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
      ))}
    </div>
  )
}
