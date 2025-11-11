import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneAllowedMimeTypes() {
  return (
    <FileDropzone
      label="Upload images"
      description="Only image files are allowed"
      allowedMimeTypes={["image/*"]}
      aria-label="Upload images"
    />
  )
}
