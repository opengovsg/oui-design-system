import type { Meta, StoryObj } from "@storybook/react-vite"

import { FileDropzone } from "../file-dropzone"

export default {
  title: "Components/FileDropzone",
  component: FileDropzone,
} as Meta<typeof FileDropzone>

type Story = StoryObj<typeof FileDropzone>

export const Default: Story = {
  args: {},
}

export const AllowOnlyImages: Story = {
  args: {
    allowedMimeTypes: ["image/*"],
  },
}

export const AllowMultipleFiles: Story = {
  args: {
    maxFiles: 5,
  },
}

export const WithCustomFileSizeLimit: Story = {
  args: {
    maxFileSize: 500 * 1000, // 500KB
  },
}
