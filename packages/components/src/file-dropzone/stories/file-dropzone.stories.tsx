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
