"use client"

import { use, useEffect, useState } from "react"
import { DialogTrigger } from "react-aria-components"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@opengovsg/oui"

export default function ModalExampleFeatureAnnouncement() {
  const CONTENT = [
    {
      header: "Feature header 1",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.`,
    },
    {
      header: "Feature header 2",
      body: `Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis.`,
    },
    {
      header: "Feature header 3",
      body: `Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.`,
    },
  ]

  const [step, setStep] = useState(0)

  const prev = () => {
    setStep((prev) => Math.max(prev - 1, 0))
  }
  const next = () => {
    setStep((prev) => Math.min(prev + 1, CONTENT.length - 1))
  }

  const hasNext = step < CONTENT.length - 1
  const hasPrev = step > 0

  return (
    <DialogTrigger>
      <Button>Open Modal</Button>
      <Modal>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="flex h-[160px] items-center justify-center bg-blue-100">
                <p>Some picture here</p>
              </div>
              <ModalHeader className="flex flex-col gap-1">
                {CONTENT[step].header}
              </ModalHeader>
              <ModalBody>
                <p>{CONTENT[step].body}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="neutral"
                  variant="clear"
                  onPress={prev}
                  isDisabled={!hasPrev}
                >
                  Back
                </Button>
                {hasNext && (
                  <Button color="main" onPress={next} isDisabled={!hasNext}>
                    Next
                  </Button>
                )}
                {!hasNext && (
                  <Button color="main" onPress={onClose}>
                    Let's go!
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DialogTrigger>
  )
}
