import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import type { FileDropzoneProps } from "../file-dropzone"
import { FileDropzone } from "../file-dropzone"

export default {
  title: "Components/FileDropzone",
  component: FileDropzone,
  args: {
    "aria-label": "File Dropzone",
  },
} as Meta<typeof FileDropzone>

type Story = StoryObj<typeof FileDropzone>

const Template = (args: FileDropzoneProps) => {
  const [error, setError] = useState<string>("")
  return (
    <FileDropzone
      {...args}
      onChange={() => {
        setError("")
      }}
      onError={setError}
      isInvalid={!!error}
      errorMessage={error}
    />
  )
}

export const Default: Story = {
  args: {},
  render: Template,
}

export const AllowOnlyImages: Story = {
  args: {
    allowedMimeTypes: ["image/*"],
  },
  render: Template,
}

export const AllowMultipleFiles: Story = {
  args: {
    maxFiles: 5,
  },
  render: Template,
}

export const WithCustomFileSizeLimit: Story = {
  args: {
    maxFileSize: 500 * 1000, // 500KB
  },
  render: Template,
}

export const WithErrorMessage: Story = {
  args: {
    isInvalid: true,
    errorMessage: "There was an error uploading your files.",
  },
}

export const WithLabelAndDescription: Story = {
  args: {
    "aria-label": undefined,
    label: "Upload your documents",
    description: "Supported formats: PDF, CSV",
    allowedMimeTypes: ["application/pdf", "text/csv"],
  },
  render: Template,
}

export const Controlled: Story = {
  args: {
    label: "Controlled FileDropzone",
  },
  render: () => {
    const [files, setFiles] = useState<File[]>([])

    return (
      <div>
        <FileDropzone
          value={files}
          onChange={setFiles}
          label="Controlled FileDropzone"
          allowedMimeTypes={["image/*"]}
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
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
  },
}

export const CustomFileInfoRendering: Story = {
  args: {
    allowedMimeTypes: ["image/*"],
    maxFiles: 3,
    children: ({ file, removeFile }) => {
      const objectUrl = URL.createObjectURL(file)
      return (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div key={file.name} className="border p-2">
            <img
              src={objectUrl}
              alt={file.name}
              className="mb-2 h-24 w-full object-cover"
              onLoad={() => URL.revokeObjectURL(objectUrl)}
            />
            <p className="truncate text-sm" title={file.name}>
              {file.name}
            </p>
            <button
              type="button"
              onClick={removeFile}
              className="mt-2 text-xs text-red-600 underline"
            >
              Remove
            </button>
          </div>
        </div>
      )
    },
  },
}
