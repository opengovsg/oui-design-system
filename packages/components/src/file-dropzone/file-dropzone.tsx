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
import { useField } from "react-aria"
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

import { useControllableState } from "../hooks"
import { createContext } from "../system/react-utils"

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
   * Maximum number of files allowed per upload.
   * @default 1
   */
  maxFiles?: number
  showRejectedFiles?: boolean
  onError?: (errors: FileError[]) => void
}

export interface FileDropzoneState extends DropzoneState {
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
    maxFiles: maxFiles,
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

  return (
    <Provider
      values={[
        [FileDropzoneStyleContext, { slots, classNames }],
        [
          FileDropzoneStateContext,
          {
            showDropzone,
            value,
            setValue,
            ...dropzoneState,
          },
        ],
        [LabelContext, labelProps],
        [
          TextContext,
          {
            slots: {
              description: descriptionProps,
              errorMessage: errorMessageProps,
            },
          },
        ],
      ]}
    >
      <Group {...fieldProps}>
        <h1>file-dropzone</h1>
      </Group>
    </Provider>
  )
}
