"use client"

import { useEffect, useState } from "react"
import { File, X } from "lucide-react"

import type { FileItem } from "./file-dropzone"
import { Button } from "../button"
import { useFileDropzoneStateContext } from "./file-dropzone"
import { formatBytes } from "./utils"

interface FileInfoProps {
  file: FileItem
}

export const FileInfo = ({ file }: FileInfoProps) => {
  const { maxFileSize, handleRemoveFile } = useFileDropzoneStateContext()

  const [previewSrc, setPreviewSrc] = useState("")
  useEffect(() => {
    let objectUrl = ""
    // create the preview
    if (file.type.startsWith("image/")) {
      objectUrl = URL.createObjectURL(file)
      setPreviewSrc(objectUrl)
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <div className="flex items-center gap-x-4 border-b py-2 first:mt-4 last:mb-4">
      {previewSrc ? (
        <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded border">
          <img src={previewSrc} alt={file.name} className="object-cover" />
        </div>
      ) : (
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded border">
          <File size={18} />
        </div>
      )}

      <div className="flex shrink grow flex-col items-start truncate">
        <p title={file.name} className="max-w-full truncate text-sm">
          {file.name}
        </p>
        {file.errors?.length ? (
          <p className="text-destructive text-xs">
            {file.errors
              .map((e) =>
                e.message.startsWith("File is larger than")
                  ? `File is larger than ${formatBytes(maxFileSize, 2)} (Size: ${formatBytes(file.size, 2)})`
                  : e.message,
              )
              .join(", ")}
          </p>
        ) : (
          <p className="text-xs">{formatBytes(file.size, 2)}</p>
        )}
      </div>

      <Button
        isIconOnly
        variant="clear"
        aria-label="Remove file"
        className="hover:text-foreground shrink-0 justify-self-end"
        onPress={() => handleRemoveFile(file.name)}
      >
        <X />
      </Button>
    </div>
  )
}
