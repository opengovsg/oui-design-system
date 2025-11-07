"use client"

import type { InputBase } from "@react-types/shared"
import type { AriaFieldProps } from "react-aria"
import type {
  DropzoneOptions,
  DropzoneState,
  FileError,
  FileRejection,
} from "react-dropzone"
import { useEffect, useMemo } from "react"
import { Upload } from "lucide-react"
import { useField, useId } from "react-aria"
import {
  Group,
  LabelContext,
  Provider,
  TextContext,
} from "react-aria-components"
import { useDropzone } from "react-dropzone"

import type {
  FileDropzoneSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { fileDropzoneStyles } from "@opengovsg/oui-theme"

import { Description } from "../field"
import { useControllableState } from "../hooks"
import { createContext } from "../system/react-utils"
import { formatBytes } from "./utils"

export interface FileItem extends File {
  errors?: readonly FileError[]
}

interface FileDropzoneProps
  extends AriaFieldProps,
    InputBase,
    VariantProps<typeof fileDropzoneStyles> {
  validator?: DropzoneOptions["validator"]
  classNames?: SlotsToClasses<FileDropzoneSlots>
  /** The current files (controlled). */
  value?: FileItem[]
  /** The default files (uncontrolled). */
  defaultValue?: FileItem[]
  /** Sets the controlled value. */
  onChange?: (value: FileItem[]) => void
  /**
   * Allowed MIME types for each file upload (e.g `image/png`, `text/html`, etc). Wildcards are also supported (e.g `image/*`).
   *
   * Defaults to allowing uploading of all MIME types.
   */
  allowedMimeTypes?: string[]
  /**
   * Maximum upload size of each file allowed in bytes. (e.g 1000 bytes = 1 KB)
   * @default Number.POSITIVE_INFINITY
   */
  maxFileSize?: number

  /**
   * Whether to show the maximum file size information below the dropzone.
   * @default true
   */
  showMaxFileSize?: boolean
  /**
   * Maximum number of files allowed per upload.
   * @default 1
   */
  maxFiles?: number
  showRejectedFiles?: boolean
  onError?: (errors: FileError[]) => void
}

export interface FileDropzoneState extends DropzoneState {
  maxFiles: number
  maxFileSizeTextId?: string
  maxFileSize: number
  showDropzone: boolean
  value: FileItem[]
  setValue: React.Dispatch<React.SetStateAction<FileItem[]>>
}

export interface FileDropzoneStyleContext {
  slots: ReturnType<typeof fileDropzoneStyles>
  classNames?: SlotsToClasses<FileDropzoneSlots>
}

export const [FileDropzoneStateContext, useFileDropzoneStateContext] =
  createContext<FileDropzoneState>({
    strict: true,
    name: "FileDropzoneStateContext",
  })
export const [FileDropzoneStyleContext, useFileDropzoneStyleContext] =
  createContext<FileDropzoneStyleContext>({
    strict: true,
    name: "FileDropzoneStyleContext",
  })

export const FileDropzone = (props: FileDropzoneProps) => {
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
    useField(props)
  const {
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    showMaxFileSize = true,
    maxFiles = 1,
    isDisabled,
    isReadOnly,
    classNames,
    validator,
    showRejectedFiles,
  } = props

  const [value, setValue] = useControllableState({
    value: props.value,
    defaultValue: props.defaultValue || [],
    onChange: props.onChange,
  })

  const slots = fileDropzoneStyles()
  const maxFileSizeTextId = useId()

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const files: FileItem[] = [...acceptedFiles]
    if (showRejectedFiles) {
      const rejectedFiles = fileRejections.map(({ file, errors }) =>
        Object.assign(file, { errors }),
      )
      files.push(...rejectedFiles)
    }
    setValue(files)

    if (props.onError && fileRejections.length > 0) {
      const allErrors = fileRejections.flatMap((rejection) => rejection.errors)
      props.onError(allErrors)
    }
  }

  const dropzoneState = useDropzone({
    validator,
    noClick: true,
    accept: allowedMimeTypes.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {},
    ),
    onDrop,
    disabled: isDisabled,
    noDrag: isReadOnly,
    noKeyboard: isReadOnly,
    maxSize: maxFileSize,
    maxFiles,
    multiple: maxFiles !== 1,
  })

  const showDropzone = useMemo(() => value.length < maxFiles, [value, maxFiles])

  useEffect(() => {
    // If the number of files doesn't exceed the maxFiles parameter, remove the error 'Too many files' from each file
    if (value.length <= maxFiles) {
      let changed = false
      const newFiles = value.map((file) => {
        if (file.errors?.some((e) => e.code === "too-many-files")) {
          file.errors = file.errors.filter((e) => e.code !== "too-many-files")
          changed = true
        }
        return file
      })
      if (changed) {
        setValue(newFiles)
      }
    }
  }, [maxFiles, setValue, value])

  const augmentedFieldProps = useMemo(() => {
    if (!showMaxFileSize) {
      return fieldProps
    }
    fieldProps["aria-describedby"] = fieldProps["aria-describedby"]
      ? `${fieldProps["aria-describedby"]} ${maxFileSizeTextId}`
      : maxFileSizeTextId
    return fieldProps
  }, [fieldProps, maxFileSizeTextId, showMaxFileSize])

  return (
    <Provider
      values={[
        [FileDropzoneStyleContext, { slots, classNames }],
        [
          FileDropzoneStateContext,
          {
            maxFiles,
            maxFileSize,
            showDropzone,
            value,
            setValue,
            maxFileSizeTextId:
              showMaxFileSize && maxFileSize !== Number.POSITIVE_INFINITY
                ? maxFileSizeTextId
                : undefined,
            ...dropzoneState,
          },
        ],
        [LabelContext, labelProps],
        [
          TextContext,
          {
            slots: {
              maxFileSize: {},
              description: descriptionProps,
              errorMessage: errorMessageProps,
            },
          },
        ],
      ]}
    >
      <Group {...augmentedFieldProps}>
        <FileDropzoneDropzone />
      </Group>
    </Provider>
  )
}

const FileDropzoneDropzone = () => {
  const {
    maxFiles,
    maxFileSize,
    maxFileSizeTextId,
    inputRef,
    getRootProps,
    getInputProps,
  } = useFileDropzoneStateContext()

  const { slots, classNames } = useFileDropzoneStyleContext()

  return (
    <div
      {...getRootProps({
        className: slots.base({
          className: classNames?.base,
        }),
      })}
    >
      <input {...getInputProps()} />
      <a onClick={() => inputRef.current?.click()} className={slots.dropzone()}>
        <Upload size={20} className="" />
        <p className="text-sm">
          Upload{!!maxFiles && maxFiles > 1 ? ` ${maxFiles}` : ""} file
          {!maxFiles || maxFiles > 1 ? "s" : ""}
        </p>
        <div className="flex flex-col items-center gap-y-1">
          <p className="text-xs">
            <span className="cursor-pointer underline transition">
              Choose {maxFiles === 1 ? `file` : "files"}
            </span>{" "}
            or drag and drop here
          </p>
          {maxFileSizeTextId && (
            <Description id={maxFileSizeTextId} slot="maxFileSize">
              Maximum file size: {formatBytes(maxFileSize, 2)}
            </Description>
          )}
          <Description slot="description">Another description</Description>
        </div>
      </a>
    </div>
  )
}
