"use client"

import type { InputBase, Validation } from "@react-types/shared"
import type { AriaFieldProps } from "react-aria"
import type { DropzoneOptions, FileError, FileRejection } from "react-dropzone"
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
  FileInfoDropzoneSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { dataAttr, fileDropzoneStyles } from "@opengovsg/oui-theme"

import type { FileItem } from "./types"
import { Description, FieldError, Label } from "../field"
import { useControllableState } from "../hooks"
import { mapPropsVariants } from "../system/utils"
import {
  FileDropzoneStateContext,
  FileDropzoneStyleContext,
  useFileDropzoneStateContext,
  useFileDropzoneStyleContext,
} from "./contexts"
import { FileInfo } from "./file-info"
import { formatBytes, formatErrorMessage } from "./utils"

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
  itemClassNames?: SlotsToClasses<FileInfoDropzoneSlots>
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
   * File size base system: binary or decimal.
   *
   * Defaults to binary (1 KB = 1024 bytes), vs. decimal (1 KB = 1000 bytes)
   */
  fileSizeBase?: "binary" | "decimal"

  /**
   * Maximum upload size of each file allowed in bytes.
   * @default Number.POSITIVE_INFINITY
   */
  maxFileSize?: number
  /**
   * Minimum upload size of each file allowed in bytes.
   * @default 0
   */
  minFileSize?: number

  /**
   * Whether to show file size information below the dropzone.
   * @default true
   */
  showFileSizeText?: boolean
  /**
   * Maximum number of files allowed per upload.
   * @default 1
   */
  maxFiles?: number

  /**
   * Whether to show rejected files in the component.
   */
  showRejectedFiles?: boolean

  /**
   * List of file rejections (controlled).
   */
  rejections?: FileItem[]

  /**
   * If provided, callback function will be called when files are rejected.
   */
  onRejection?: (rejections: FileItem[]) => void
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

  /**
   * If provided, the image preview will be shown in the given size variant.
   * If `null`, no image preview will be shown.
   * @default "small"
   */
  imagePreview?: "small" | "large" | null
}

export const FileDropzone = (originalProps: FileDropzoneProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    fileDropzoneStyles.variantKeys,
  )
  const {
    name,
    allowedMimeTypes = [],
    fileSizeBase = "binary",
    maxFileSize = Number.POSITIVE_INFINITY,
    minFileSize = 0,
    showFileSizeText = true,
    maxFiles = 1,
    isDisabled,
    isReadOnly,
    classNames,
    itemClassNames,
    validator,
    showRejectedFiles,
    onError,
    errorMessage,
    label,
    description,
    children,
    hideDropzoneOnValue = maxFiles === 1,
    imagePreview = "small",
  } = props

  const [value, setValue] = useControllableState({
    value: props.value,
    defaultValue: props.defaultValue || [],
    onChange: props.onChange,
  })
  const [rejections, setRejections] = useControllableState({
    value: props.rejections,
    defaultValue: [],
    onChange: props.onRejection,
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

  const slots = fileDropzoneStyles(variantProps)
  const fileSizeTextId = useId()

  const formatError = useCallback(
    (error: FileError) =>
      formatErrorMessage(error, {
        maxFileSize,
        minFileSize,
        maxFiles,
        fileSizeBase,
      }),
    [fileSizeBase, maxFileSize, maxFiles, minFileSize],
  )

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const files: FileItem[] = acceptedFiles
      if (showRejectedFiles) {
        const invalidFiles = fileRejections.map(({ file, errors }) => {
          ;(file as FileItem).errors = errors
          return file as FileItem
        })
        setRejections(invalidFiles)
      }
      setValue(files)

      if (onError && fileRejections.length > 0) {
        const firstError = fileRejections[0].errors[0]
        onError(formatError(firstError))
      }
    },
    [formatError, onError, setRejections, setValue, showRejectedFiles],
  )

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      setValue((files) => files.filter((file) => file.name !== fileName))
    },
    [setValue],
  )
  const handleRemoveRejection = useCallback(
    (fileName: string) => {
      setRejections((rejections) =>
        rejections.filter((file) => file.name !== fileName),
      )
    },
    [setRejections],
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
    minSize: minFileSize,
    maxFiles,
    multiple: maxFiles !== 1,
  })

  const fileSizeText = useMemo(() => {
    const notDefaultMaxFileSize = maxFileSize !== Number.POSITIVE_INFINITY
    const notDefaultMinFileSize = minFileSize !== 0
    const shouldShow =
      showFileSizeText && (notDefaultMaxFileSize || notDefaultMinFileSize)
    if (!shouldShow) return null
    if (notDefaultMaxFileSize && notDefaultMinFileSize) {
      return `File size must be between ${formatBytes(minFileSize, 2, fileSizeBase)} and ${formatBytes(
        maxFileSize,
        2,
        fileSizeBase,
      )}`
    }
    if (notDefaultMaxFileSize) {
      return `Maximum file size: ${formatBytes(maxFileSize, 2, fileSizeBase)}`
    }
    if (notDefaultMinFileSize) {
      return `Minimum file size: ${formatBytes(minFileSize, 2, fileSizeBase)}`
    }
    return null
  }, [maxFileSize, minFileSize, showFileSizeText, fileSizeBase])

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
    if (fileSizeText) {
      inputProps["aria-describedby"] = inputProps["aria-describedby"]
        ? `${inputProps["aria-describedby"]} ${fileSizeTextId}`
        : fileSizeTextId
    }

    return getInputProps(inputProps)
  }, [fieldProps, getInputProps, fileSizeTextId, name, fileSizeText])

  const showDropzone = useMemo(() => {
    if (hideDropzoneOnValue) {
      return value.length < maxFiles
    }
    return true
  }, [hideDropzoneOnValue, maxFiles, value.length])

  return (
    <Provider
      values={[
        [
          FileDropzoneStyleContext,
          { slots, classNames, itemClassNames, ...variantProps },
        ],
        [
          FileDropzoneStateContext,
          {
            isDisabled,
            isReadOnly,
            fileSizeBase,
            maxFiles,
            maxFileSize,
            showDropzone,
            files: value,
            handleRemoveFile,
            handleRemoveRejection,
            formatError,
            inputProps,
            triggerFileSelector,
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
              fileSize: {},
              description: descriptionProps,
              errorMessage: errorMessageProps,
            },
          },
        ],
        [FieldErrorContext, { isInvalid, validationErrors, validationDetails }],
      ]}
    >
      <Group className={slots.base({ className: classNames?.base })}>
        {label && <Label size={variantProps.size}>{label}</Label>}
        {showDropzone && <FileDropzoneDropzone />}
        {value.map((file) => {
          if (typeof children === "function") {
            return children({
              file,
              removeFile: () => handleRemoveFile(file.name),
            })
          }
          return (
            <FileInfo imagePreview={imagePreview} key={file.name} file={file} />
          )
        })}
        {rejections.length >= 1 &&
          rejections.map((rj) => (
            <FileInfo imagePreview={imagePreview} key={rj.name} file={rj} />
          ))}
        {fileSizeText && (
          <Description
            size={variantProps.size}
            id={fileSizeTextId}
            slot="fileSize"
          >
            {fileSizeText}
          </Description>
        )}
        {description && (
          <Description size={variantProps.size}>{description}</Description>
        )}
        {errorMessage && (
          <FieldError size={variantProps.size}>{errorMessage}</FieldError>
        )}
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
        <div className={slots.text({ className: classNames?.text })}>
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
