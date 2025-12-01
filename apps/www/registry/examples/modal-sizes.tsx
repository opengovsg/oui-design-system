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

export default function ModalSizes() {
  const mainSizes = ["desktop", "mobile", "full"] as const

  const extraSizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
  ] as const

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {mainSizes.map((size) => (
          <DialogTrigger key={size}>
            <Button variant="outline">{size}</Button>
            <Modal size={size}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader>Modal Size: {size}</ModalHeader>
                    <ModalBody>
                      <p>
                        This modal demonstrates the <strong>{size}</strong> size
                        variant.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
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
      <div className="flex flex-wrap gap-2">
        {extraSizes.map((size) => (
          <DialogTrigger key={size}>
            <Button variant="outline">{size}</Button>
            <Modal size={size}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader>Modal Size: {size}</ModalHeader>
                    <ModalBody>
                      <p>
                        This modal demonstrates the <strong>{size}</strong> size
                        variant.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
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
    </div>
  )
}
