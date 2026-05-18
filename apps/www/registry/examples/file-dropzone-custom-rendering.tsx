"use client"

import Image from "next/image"

import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneCustomRendering() {
  return (
    <FileDropzone
      label="Custom file display"
      allowedMimeTypes={["image/*"]}
      maxFiles={3}
    >
      {({ file, removeFile }) => {
        const objectUrl = URL.createObjectURL(file)
        return (
          <div key={file.name} className="mt-4 rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <Image
                src={objectUrl}
                alt={file.name}
                width={80}
                height={80}
                unoptimized
                className="h-20 w-20 rounded object-cover"
                onLoad={() => URL.revokeObjectURL(objectUrl)}
              />
              <div className="flex-1">
                <p className="font-medium" title={file.name}>
                  {file.name}
                </p>
                <p className="text-sm text-gray-600">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-sm text-red-600 underline hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        )
      }}
    </FileDropzone>
  )
}
