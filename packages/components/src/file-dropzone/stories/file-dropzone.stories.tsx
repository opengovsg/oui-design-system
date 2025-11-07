import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import type { FileDropzoneProps } from "../file-dropzone"
import { FileDropzone } from "../file-dropzone"

export default {
  title: "Components/FileDropzone",
  component: FileDropzone,
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
