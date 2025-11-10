"use client"

import type { InputBase, Validation } from "@react-types/shared"
import type { AriaFieldProps } from "react-aria"
import type {
  DropzoneOptions,
  DropzoneState,
  FileError,
  FileRejection,
} from "react-dropzone"
import { useCallback, useEffect, useMemo } from "react"
import { useFormValidationState } from "@react-stately/form"
import { Upload } from "lucide-react"
import { useField, useId } from "react-aria"
import {
  FieldErrorContext,
  Group,
  GroupContext,
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
import { dataAttr, fileDropzoneStyles } from "@opengovsg/oui-theme"

import { Description, FieldError, Label } from "../field"
import { useControllableState } from "../hooks"
import { createContext } from "../system/react-utils"
import { FileInfo } from "./file-info"
import { formatBytes } from "./utils"

export interface FileItem extends File {
  errors?: readonly FileError[]
}

export interface FileItemsRenderProps {
  file: FileItem
  removeFile: () => void
}

export interface FileDropzoneProps
  extends Omit<AriaFieldProps, "validate">,
    InputBase,
    Validation<FileItem[]>,
    VariantProps<typeof fileDropzoneStyles> {
  name?: string
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode

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
  /**
   * If provided, this function will be called with any error messages that occur during file validation.
   * If there are multiple errors, only the first message will be passed to this function.
   */
  onError?: (errorMessage: string) => void
  children?: (values: FileItemsRenderProps) => React.ReactNode

  /**
   * Whether to hide the dropzone when there is at least one file uploaded.
   * @default true if maxFiles is 1, false otherwise
   */
  hideDropzoneOnValue?: boolean
}

export interface FileDropzoneState
  extends Omit<DropzoneState, "getInputProps"> {
  isDisabled?: boolean
  isReadOnly?: boolean
  inputProps: ReturnType<DropzoneState["getInputProps"]>
  triggerFileSelector: () => void | null
  maxFiles: number
  maxFileSizeTextId?: string
  maxFileSize: number
  showDropzone: boolean
  files: FileItem[]
  handleRemoveFile: (fileName: string) => void
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
  const {
    name,
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    showMaxFileSize = true,
    maxFiles = 1,
    isDisabled,
    isReadOnly,
    classNames,
    validator,
    showRejectedFiles,
    onError,
    errorMessage,
    label,
    description,
    children,
    hideDropzoneOnValue = maxFiles === 1,
  } = props

  const [value, setValue] = useControllableState({
    value: props.value,
    defaultValue: props.defaultValue || [],
    onChange: props.onChange,
  })

  const validationState = useFormValidationState({
    ...props,
    value,
  })

  const { isInvalid, validationErrors, validationDetails } =
    validationState.displayValidation

  const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
    useField({
      ...props,
      isInvalid,
      errorMessage: props.errorMessage || validationErrors,
    })

  const slots = fileDropzoneStyles()
  const maxFileSizeTextId = useId()

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const files: FileItem[] = acceptedFiles
      if (showRejectedFiles) {
        const invalidFiles = fileRejections.map(({ file, errors }) => {
          ;(file as FileItem).errors = errors
          return file as FileItem
        })
        files.push(...invalidFiles)
      }
      setValue(files)

      if (onError && fileRejections.length > 0) {
        const firstError = fileRejections[0].errors[0]
        if (firstError.code === "file-too-large") {
          // The error message is in bytes, we need to format it to be more user-friendly
          onError(`File is larger than ${formatBytes(maxFileSize, 2)}`)
        } else {
          onError(firstError.message)
        }
      }
    },
    [maxFileSize, onError, setValue, showRejectedFiles],
  )

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      setValue((files) => files.filter((file) => file.name !== fileName))
    },
    [setValue],
  )

  const { getInputProps, ...dropzoneState } = useDropzone({
    validator,
    accept: allowedMimeTypes.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {},
    ),
    onError: (e) => onError?.(e.message),
    onDrop,
    disabled: isDisabled,
    noDrag: isReadOnly,
    // Prevent ref hijack when there is a label
    noClick: true,
    noKeyboard: true,
    maxSize: maxFileSize,
    maxFiles,
    multiple: maxFiles !== 1,
  })

  const showMaxFileSizeText = useMemo(
    () => showMaxFileSize && maxFileSize !== Number.POSITIVE_INFINITY,
    [maxFileSize, showMaxFileSize],
  )

  const triggerFileSelector = useCallback(() => {
    if (isDisabled || isReadOnly) return
    // Not using dropzoneState.open() due to ref hijack issues when there is a label
    dropzoneState.inputRef.current?.click()
  }, [dropzoneState, isDisabled, isReadOnly])

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

  const inputProps = useMemo(() => {
    const inputProps = { ...fieldProps, name }
    if (showMaxFileSizeText) {
      inputProps["aria-describedby"] = inputProps["aria-describedby"]
        ? `${inputProps["aria-describedby"]} ${maxFileSizeTextId}`
        : maxFileSizeTextId
    }

    return getInputProps(inputProps)
  }, [fieldProps, getInputProps, maxFileSizeTextId, name, showMaxFileSizeText])

  const showDropzone = useMemo(() => {
    if (hideDropzoneOnValue) {
      return value.length < maxFiles
    }
    return true
  }, [hideDropzoneOnValue, maxFiles, value.length])

  return (
    <Provider
      values={[
        [FileDropzoneStyleContext, { slots, classNames }],
        [
          FileDropzoneStateContext,
          {
            isDisabled,
            isReadOnly,
            maxFiles,
            maxFileSize,
            showDropzone,
            files: value,
            handleRemoveFile,
            inputProps,
            triggerFileSelector,
            maxFileSizeTextId: showMaxFileSizeText
              ? maxFileSizeTextId
              : undefined,
            ...dropzoneState,
          },
        ],
        [LabelContext, labelProps],
        [
          GroupContext,
          {
            role: "presentation",
            isInvalid,
            isDisabled: props.isDisabled || false,
          },
        ],
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
        [FieldErrorContext, { isInvalid, validationErrors, validationDetails }],
      ]}
    >
      <Group className={slots.base({ className: classNames?.base })}>
        {label && <Label>{label}</Label>}
        {showDropzone && <FileDropzoneDropzone />}
        {value.map((file) => {
          if (typeof children === "function") {
            return children({
              file,
              removeFile: () => handleRemoveFile(file.name),
            })
          }
          return <FileInfo key={file.name} file={file} />
        })}
        {showMaxFileSizeText && (
          <Description id={maxFileSizeTextId} slot="maxFileSize">
            Maximum file size: {formatBytes(maxFileSize, 2)}
          </Description>
        )}
        {description && <Description>{description}</Description>}
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </Group>
    </Provider>
  )
}

const FileDropzoneDropzone = () => {
  const {
    maxFiles,
    getRootProps,
    inputProps,
    triggerFileSelector,
    isDisabled,
    isDragActive,
  } = useFileDropzoneStateContext()
  const { slots, classNames } = useFileDropzoneStyleContext()

  return (
    <div
      {...getRootProps({
        "aria-disabled": isDisabled,
        className: slots.group({
          className: classNames?.group,
        }),
      })}
      tabIndex={isDisabled ? undefined : 0}
      onClick={triggerFileSelector}
      onKeyDown={(e) => {
        // Trigger file selector on Enter or Space key press
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          triggerFileSelector()
        }
      }}
    >
      <input {...inputProps} />
      <div
        data-dragging={dataAttr(isDragActive)}
        className={slots.dropzone({ className: classNames?.dropzone })}
      >
        <Upload className={slots.icon({ className: classNames?.icon })} />
        <div className="">
          <span
            className={slots.dropzoneHighlight({
              className: classNames?.dropzoneHighlight,
            })}
          >
            Choose {maxFiles === 1 ? `file` : `files`}
          </span>{" "}
          or drag and drop here
        </div>
      </div>
    </div>
  )
}
