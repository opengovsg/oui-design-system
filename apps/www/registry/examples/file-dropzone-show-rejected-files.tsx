import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneShowRejectedFiles() {
  return (
    <FileDropzone
      label="Upload text files only"
      description="Try uploading an image to see rejection"
      allowedMimeTypes={["text/plain"]}
      showRejectedFiles
      hideDropzoneOnValue={false}
    />
  )
}
