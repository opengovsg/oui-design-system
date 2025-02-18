"use server"

import { codeToHtml } from "shiki"

export const highlightCode = async (
  code: string,
  opts?: Partial<Parameters<typeof codeToHtml>[1]>,
) => {
  return codeToHtml(code, {
    lang: "tsx",
    theme: "aurora-x",
    ...opts,
  })
}
