"use client"

import { FileDropzone, toast } from "@opengovsg/oui"

export default function FileDropzoneWithErrorMessage() {
  return (
    <FileDropzone
      label="Upload PDF only"
      allowedMimeTypes={["application/pdf"]}
      maxFileSize={1000 * 1000} // 1MB
      onError={(error) => toast.error(error)}
    />
  )
}
