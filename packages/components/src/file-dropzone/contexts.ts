import type { FileDropzoneState, FileDropzoneStyleContextReturn } from "./types"
import { createContext } from "../system/react-utils"

export const [FileDropzoneStateContext, useFileDropzoneStateContext] =
  createContext<FileDropzoneState>({
    strict: true,
    name: "FileDropzoneStateContext",
  })
export const [FileDropzoneStyleContext, useFileDropzoneStyleContext] =
  createContext<FileDropzoneStyleContextReturn>({
    strict: true,
    name: "FileDropzoneStyleContext",
  })
