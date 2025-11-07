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
