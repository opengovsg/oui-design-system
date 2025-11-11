import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneWithLabelAndDescription() {
  return (
    <FileDropzone
      label="Upload your documents"
      description="All file types are accepted"
    />
  )
}
