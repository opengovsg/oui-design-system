import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneImagePreview() {
  return (
    <div className="flex w-full flex-col gap-6">
      <FileDropzone
        label="Small preview (default)"
        allowedMimeTypes={["image/*"]}
        imagePreview="small"
      />
      <FileDropzone
        label="Large preview"
        allowedMimeTypes={["image/*"]}
        imagePreview="large"
      />
      <FileDropzone
        label="No preview"
        allowedMimeTypes={["image/*"]}
        imagePreview={null}
      />
    </div>
  )
}
