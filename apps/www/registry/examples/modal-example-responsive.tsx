"use client"

import { DialogTrigger } from "react-aria-components"
import { useMediaQuery } from "usehooks-ts"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@opengovsg/oui"

export default function ModalExampleResponsive() {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-10">
      <DialogTrigger>
        <Button>Open Responsive Modal</Button>
        <Modal size={isMobile ? "mobile" : "desktop"} placement="bottom-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Responsive Modal</ModalHeader>
                <ModalBody>
                  <p>
                    This modal automatically adjusts its size based on the
                    screen width.
                  </p>
                  <p>
                    On mobile devices, it uses the &quot;mobile&quot; size, and
                    on larger screens, it uses the &quot;desktop&quot; size.
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Current mode:{" "}
                    <span className="font-medium">
                      {isMobile ? "Mobile" : "Desktop"}
                    </span>
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
    </div>
  )
}
