"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

import type {
  FileInfoDropzoneSlots,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { cn, fileInfoDropzoneStyles } from "@opengovsg/oui-theme"

import type { FileItem } from "./types"
import { Button } from "../button"
import {
  useFileDropzoneStateContext,
  useFileDropzoneStyleContext,
} from "./contexts"
import { formatBytes } from "./utils"

export interface FileInfoProps {
  file: FileItem
  imagePreview?: "small" | "large" | null
  classNames?: SlotsToClasses<FileInfoDropzoneSlots>
}

export const FileInfo = ({ file, imagePreview, classNames }: FileInfoProps) => {
  const {
    handleRemoveFile,
    handleRemoveRejection,
    formatError,
    isDisabled,
    isReadOnly,
  } = useFileDropzoneStateContext()
  const { size, variant, itemClassNames } = useFileDropzoneStyleContext()
  const { fileSizeBase } = useFileDropzoneStateContext()

  const readableFileSize = formatBytes(file.size, 2, fileSizeBase)

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
            alt={`Image preview of uploaded file: ${file.name}`}
            className={styles.image({
              className: cn(itemClassNames?.image, classNames?.image),
            })}
          />
        </div>
      )}

      <div
        className={styles.container({
          className: cn(itemClassNames?.container, classNames?.container),
        })}
      >
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
          <p
            className={styles.size({
              className: cn(itemClassNames?.size, classNames?.size),
            })}
          >
            {readableFileSize}
          </p>
          {file.errors?.length && (
            <p
              className={styles.error({
                className: cn(itemClassNames?.error, classNames?.error),
              })}
            >
              {file.errors.map(formatError).join(", ")}
            </p>
          )}
        </div>

        <Button
          isDisabled={isDisabled || isReadOnly}
          isIconOnly={!file.errors?.length}
          size={size === "md" ? "md" : "xs"}
          variant="clear"
          color={file.errors?.length ? "main" : "critical"}
          aria-label="Remove file"
          className={styles.actionButton({
            className: cn(
              itemClassNames?.actionButton,
              classNames?.actionButton,
            ),
          })}
          onPress={() =>
            file.errors?.length
              ? handleRemoveRejection(file.name)
              : handleRemoveFile(file.name)
          }
        >
          {file.errors?.length ? "Dismiss" : <Trash2 />}
        </Button>
      </div>
    </div>
  )
}
