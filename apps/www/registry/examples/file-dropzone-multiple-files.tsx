import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneMultipleFiles() {
  return (
    <FileDropzone
      label="Upload multiple files"
      description="You can upload up to 5 files"
      maxFiles={5}
      hideDropzoneOnValue={false}
    />
  )
}
