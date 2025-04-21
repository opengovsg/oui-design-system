"use client"

import { useState } from "react"
import { DialogTrigger, Radio, RadioGroup } from "react-aria-components"

import {
  Button,
  FieldGroup,
  Label,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@opengovsg/oui"

export default function ModalPlacement() {
  const [modalPlacement, setModalPlacement] = useState("auto")

  return (
    <div>
      <RadioGroup
        orientation="horizontal"
        value={modalPlacement}
        onChange={setModalPlacement}
      >
        <Label>Modal Placement</Label>
        <Radio value="auto">auto</Radio>
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="center">center</Radio>
        <Radio value="top-center">top-center</Radio>
        <Radio value="bottom-center">bottom-center</Radio>
      </RadioGroup>
      <DialogTrigger>
        <Button>Open Modal</Button>
        <Modal placement={modalPlacement}>
          <ModalContent>
            {(onClose) => (
              <>
                <div className="flex h-[160px] items-center justify-center bg-blue-100">
                  <p>Some picture here</p>
                </div>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
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
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="neutral" variant="clear" onPress={onClose}>
                    Maybe later
                  </Button>
                  <Button color="main" onPress={onClose}>
                    Learn more
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </DialogTrigger>
    </div>
  )
}
