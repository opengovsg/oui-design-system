import type { FileRejection } from "react-dropzone"
import { ErrorCode } from "react-dropzone"

export interface MaxFileSizeRule {
  /** MIME types this rule applies to (e.g. ["application/zip"]) */
  mimeTypes: string[]
  /** Max file size in bytes for these types */
  maxFileSize: number
  /** Display label for fileSizeText (e.g. ".zip files"). Falls back to raw mime type string. */
  label?: string
}

/**
 * Check if a file's MIME type matches a pattern.
 * Supports exact matches ("application/zip") and wildcards ("image/*").
 */
export const matchesMimeType = (
  fileType: string,
  pattern: string,
): boolean => {
  if (pattern === "*" || pattern === "*/*") return true
  if (pattern.endsWith("/*")) {
    const prefix = pattern.slice(0, pattern.indexOf("/"))
    return fileType.startsWith(prefix + "/")
  }
  return fileType === pattern
}

/**
 * Resolve the effective max file size for a given file type.
 * Iterates rules in order; first match wins. Falls back to defaultMaxSize.
 */
export const resolveMaxFileSize = (
  fileType: string,
  rules: MaxFileSizeRule[],
  defaultMaxSize: number,
): number => {
  for (const rule of rules) {
    if (rule.mimeTypes.some((pattern) => matchesMimeType(fileType, pattern))) {
      return rule.maxFileSize
    }
  }
  return defaultMaxSize
}

export const formatBytes = (
  bytes: number,
  decimals = 2,
  base: "binary" | "decimal" = "binary",
  size?: "bytes" | "KB" | "MB" | "GB" | "TB" | "PB" | "EB" | "ZB" | "YB",
) => {
  const k = base === "binary" ? 1024 : 1000
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
  config: {
    maxFileSize: number
    minFileSize: number
    maxFiles: number
    fileSizeBase: "binary" | "decimal"
  },
) => {
  const { maxFileSize, minFileSize, maxFiles } = config
  switch (error.code) {
    case ErrorCode.FileTooLarge:
      // The error message is in bytes, we need to format it to be more user-friendly
      return `You have exceeded the size limit, please upload a file below ${formatBytes(maxFileSize, 2, config.fileSizeBase)}`
    case ErrorCode.FileTooSmall:
      // The error message is in bytes, we need to format it to be more user-friendly
      return `Please upload a file above ${formatBytes(minFileSize, 2, config.fileSizeBase)}`
    case ErrorCode.TooManyFiles:
      return `Maximum number of files allowed is ${maxFiles}.`
    default: {
      return error.message
    }
  }
}
