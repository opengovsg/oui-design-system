import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzonePerMimeTypeFileSize() {
  return (
    <FileDropzone
      label="Upload documents"
      allowedMimeTypes={[
        "application/zip",
        "application/x-zip-compressed",
        "image/*",
        "text/*",
      ]}
      maxFileSize={4.5 * 1000 * 1000} // 4.5MB default
      maxFileSizeByType={[
        {
          mimeTypes: ["application/zip", "application/x-zip-compressed"],
          maxFileSize: 1 * 1000 * 1000 * 1000, // 1GB
          label: ".zip files",
        },
      ]}
      fileSizeBase="decimal"
    />
  )
}
