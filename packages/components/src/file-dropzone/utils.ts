import type { FileRejection } from "react-dropzone"
import { ErrorCode } from "react-dropzone"

export const formatBytes = (
  bytes: number,
  decimals = 2,
  size?: "bytes" | "KB" | "MB" | "GB" | "TB" | "PB" | "EB" | "ZB" | "YB",
) => {
  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  if (bytes === 0 || bytes === undefined)
    return size !== undefined ? `0 ${size}` : "0 bytes"
  const i =
    size !== undefined
      ? sizes.indexOf(size)
      : Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export const formatErrorMessage = (
  error: FileRejection["errors"][number],
  config: { maxFileSize: number; minFileSize: number; maxFiles: number },
) => {
  const { maxFileSize, minFileSize, maxFiles } = config
  switch (error.code) {
    case ErrorCode.FileTooLarge:
      // The error message is in bytes, we need to format it to be more user-friendly
      return `You have exceeded the limit, please upload a file below ${formatBytes(maxFileSize, 2)}`
    case ErrorCode.FileTooSmall:
      // The error message is in bytes, we need to format it to be more user-friendly
      return `Please upload a file above ${formatBytes(minFileSize, 2)}`
    case ErrorCode.TooManyFiles:
      return `Maximum number of files allowed is ${maxFiles}.`
    default: {
      return error.message
    }
  }
}
