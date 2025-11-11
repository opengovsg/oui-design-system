import { FileDropzone } from "@opengovsg/oui"

export default function FileDropzoneSizes() {
  return (
    <div className="flex w-full flex-col gap-6">
      <FileDropzone
        label="Small"
        description="This is a small file dropzone"
        size="sm"
      />
      <FileDropzone
        label="Medium (default)"
        description="This is a medium file dropzone"
        size="md"
      />
    </div>
  )
}
