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

const ANIMATIONS = [
  { value: "zoom", label: "Zoom (default)", description: "the default zoom" },
  { value: "fade", label: "Fade", description: "the fade" },
  { value: "none", label: "None", description: "no" },
] as const

export default function ModalAnimation() {
  return (
    <div className="flex flex-wrap gap-3">
      {ANIMATIONS.map(({ value, label, description }) => (
        <DialogTrigger key={value}>
          <Button variant="outline">{label}</Button>
          <Modal animation={value}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>{label} Animation</ModalHeader>
                  <ModalBody>
                    <p>This modal uses {description} animation.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onPress={onClose}>Close</Button>
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
