import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneDisabled() {
  return (
    <FileDropzone
      label="Disabled file dropzone"
      description="This dropzone cannot be interacted with"
      isDisabled
    />
  )
}
