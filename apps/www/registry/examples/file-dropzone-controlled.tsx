"use client"

import type { FileItem } from "@opengovsg/oui"
import { FileDropzone } from "@opengovsg/oui"
import { useState } from "react"

export default function FileDropzoneControlled() {
  const [files, setFiles] = useState<FileItem[]>([])

  return (
    <div className="w-full">
      <FileDropzone
        value={files}
        onChange={setFiles}
        label="Controlled FileDropzone"
        maxFiles={3}
      />
      <div className="mt-4">
        <strong>Selected Files:</strong>
        {files.length === 0 ? (
          <p>No files selected.</p>
        ) : (
          <ul className="list-inside list-disc">
            {files.map((file) => (
              <li key={file.name}>
                {file.name} - {(file.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
