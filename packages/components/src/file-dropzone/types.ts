import type {
  FileDropzoneSlots,
  fileDropzoneStyles,
  FileDropzoneVariantProps,
  FileInfoDropzoneSlots,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import type { DropzoneState, FileError } from "react-dropzone"

export interface FileItem extends File {
  errors?: readonly FileError[]
}

export interface FileDropzoneState extends Omit<
  DropzoneState,
  "getInputProps"
> {
  isDisabled?: boolean
  isReadOnly?: boolean
  inputProps: ReturnType<DropzoneState["getInputProps"]>
  triggerFileSelector: () => void | null
  fileSizeBase: "binary" | "decimal"
  maxFiles: number
  maxFileSize: number
  showDropzone: boolean
  files: FileItem[]
  handleRemoveFile: (fileName: string) => void
  handleRemoveRejection: (fileName: string) => void
  formatError: (error: FileError) => string
}

export interface FileDropzoneStyleContextReturn extends FileDropzoneVariantProps {
  slots: ReturnType<typeof fileDropzoneStyles>
  classNames?: SlotsToClasses<FileDropzoneSlots>
  itemClassNames?: SlotsToClasses<FileInfoDropzoneSlots>
}
