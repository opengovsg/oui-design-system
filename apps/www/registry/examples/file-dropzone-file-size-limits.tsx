import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneFileSizeLimits() {
  return (
    <FileDropzone
      label="Upload documents"
      maxFileSize={2 * 1000 * 1000} // 2MB
      minFileSize={10 * 1000} // 10KB
    />
  )
}
