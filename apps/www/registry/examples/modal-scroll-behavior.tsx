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

export default function ModalScrollBehavior() {
  const scrollBehaviors = ["normal", "inside", "outside"] as const

  return (
    <div className="flex flex-wrap gap-2">
      {scrollBehaviors.map((behavior) => (
        <DialogTrigger key={behavior}>
          <Button variant="outline">{behavior}</Button>
          <Modal scrollBehavior={behavior}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Scroll Behavior: {behavior}</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                      duis sit officia eiusmod Lorem aliqua enim laboris do
                      dolor eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Nullam pulvinar risus non
                      risus hendrerit venenatis. Pellentesque sit amet hendrerit
                      risus, sed porttitor quam. Magna exercitation
                      reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                      cillum quis. Velit duis sit officia eiusmod Lorem aliqua
                      enim laboris do dolor eiusmod. Et mollit incididunt nisi
                      consectetur esse laborum eiusmod pariatur proident Lorem
                      eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                      duis sit officia eiusmod Lorem aliqua enim laboris do
                      dolor eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Nullam pulvinar risus non
                      risus hendrerit venenatis. Pellentesque sit amet hendrerit
                      risus, sed porttitor quam. Magna exercitation
                      reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                      cillum quis. Velit duis sit officia eiusmod Lorem aliqua
                      enim laboris do dolor eiusmod. Et mollit incididunt nisi
                      consectetur esse laborum eiusmod pariatur proident Lorem
                      eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                      duis sit officia eiusmod Lorem aliqua enim laboris do
                      dolor eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Nullam pulvinar risus non
                      risus hendrerit venenatis. Pellentesque sit amet hendrerit
                      risus, sed porttitor quam. Magna exercitation
                      reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                      cillum quis. Velit duis sit officia eiusmod Lorem aliqua
                      enim laboris do dolor eiusmod. Et mollit incididunt nisi
                      consectetur esse laborum eiusmod pariatur proident Lorem
                      eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                      duis sit officia eiusmod Lorem aliqua enim laboris do
                      dolor eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Nullam pulvinar risus non
                      risus hendrerit venenatis. Pellentesque sit amet hendrerit
                      risus, sed porttitor quam. Magna exercitation
                      reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                      cillum quis. Velit duis sit officia eiusmod Lorem aliqua
                      enim laboris do dolor eiusmod. Et mollit incididunt nisi
                      consectetur esse laborum eiusmod pariatur proident Lorem
                      eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                      duis sit officia eiusmod Lorem aliqua enim laboris do
                      dolor eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Nullam pulvinar risus non
                      risus hendrerit venenatis. Pellentesque sit amet hendrerit
                      risus, sed porttitor quam. Magna exercitation
                      reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                      cillum quis. Velit duis sit officia eiusmod Lorem aliqua
                      enim laboris do dolor eiusmod. Et mollit incididunt nisi
                      consectetur esse laborum eiusmod pariatur proident Lorem
                      eiusmod et. Culpa deserunt nostrud ad veniam.
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
