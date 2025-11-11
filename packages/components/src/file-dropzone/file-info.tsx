"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

import type {
  FileInfoDropzoneSlots,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { cn, fileInfoDropzoneStyles } from "@opengovsg/oui-theme"

import type { FileItem } from "./file-dropzone"
import { Button } from "../button"
import {
  useFileDropzoneStateContext,
  useFileDropzoneStyleContext,
} from "./file-dropzone"
import { formatBytes } from "./utils"

interface FileInfoProps {
  file: FileItem
  imagePreview?: "small" | "large" | null
  classNames?: SlotsToClasses<FileInfoDropzoneSlots>
}

export const FileInfo = ({ file, imagePreview, classNames }: FileInfoProps) => {
  const { handleRemoveFile, formatError, isDisabled, isReadOnly } =
    useFileDropzoneStateContext()
  const { size, variant, itemClassNames } = useFileDropzoneStyleContext()

  const readableFileSize = formatBytes(file.size, 2)

  const styles = fileInfoDropzoneStyles({
    size,
    variant,
    imagePreview: imagePreview ?? undefined,
  })

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
    <div
      className={styles.base({
        className: cn(itemClassNames?.base, classNames?.base),
      })}
    >
      <div className="sr-only">
        File attached: {file.name} with file size of {readableFileSize}
      </div>
      {imagePreview && previewSrc && (
        <div
          className={styles.imageContainer({
            className: cn(
              itemClassNames?.imageContainer,
              classNames?.imageContainer,
            ),
          })}
        >
          <img
            src={previewSrc}
            alt={file.name}
            className={styles.image({
              className: cn(itemClassNames?.image, classNames?.image),
            })}
          />
        </div>
      )}

      <div
        className={styles.textContainer({
          className: cn(
            itemClassNames?.textContainer,
            classNames?.textContainer,
          ),
        })}
      >
        <p
          title={file.name}
          className={styles.name({
            className: cn(itemClassNames?.name, classNames?.name),
          })}
        >
          {file.name}
        </p>
        {file.errors?.length ? (
          <p
            className={styles.error({
              className: cn(itemClassNames?.error, classNames?.error),
            })}
          >
            {file.errors.map(formatError).join(", ")}
          </p>
        ) : (
          <p
            className={styles.size({
              className: cn(itemClassNames?.size, classNames?.size),
            })}
          >
            {readableFileSize}
          </p>
        )}
      </div>

      <Button
        isDisabled={isDisabled || isReadOnly}
        isIconOnly
        size={size === "md" ? "md" : "xs"}
        variant="clear"
        color="critical"
        aria-label="Remove file"
        className={styles.actionButton({
          className: cn(itemClassNames?.actionButton, classNames?.actionButton),
        })}
        onPress={() => handleRemoveFile(file.name)}
      >
        <Trash2 />
      </Button>
    </div>
  )
}
