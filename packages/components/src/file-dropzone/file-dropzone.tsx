"use client"

import { fileDropzoneStyles, VariantProps } from "@opengovsg/oui-theme"

interface FileDropzoneProps extends VariantProps<typeof fileDropzoneStyles> {}

export const FileDropzone = ({  }: FileDropzoneProps) => {
  return (
    <div>
      <h1>file-dropzone</h1>
    </div>
  )
}
