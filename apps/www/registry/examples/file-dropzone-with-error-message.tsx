"use client"

import { FileDropzone } from "@opengovsg/oui"
import { useState } from "react"

export default function FileDropzoneWithErrorMessage() {
  const [error, setError] = useState<string>("")

  return (
    <FileDropzone
      label="Upload PDF only"
      allowedMimeTypes={["application/pdf"]}
      maxFileSize={1000 * 1000} // 1MB
      onChange={() => setError("")}
      onError={setError}
      isInvalid={!!error}
      errorMessage={error}
    />
  )
}
