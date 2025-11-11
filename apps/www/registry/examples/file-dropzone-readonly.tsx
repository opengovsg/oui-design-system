import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneReadonly() {
  return (
    <FileDropzone
      label="Read-only file dropzone"
      description="Files can be viewed but not modified"
      isReadOnly
    />
  )
}
