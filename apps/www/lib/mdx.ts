"use server"

import { Index } from "@/__registry__"
import { readFile } from "fs-extra"

export const readRegistryFile = async (name: string) => {
  const path = Index[name]?.files?.[0]?.path
  let content = await readFile(`${process.cwd()}/${path}`, "utf8")
  // Replace `export default function ButtonDemo() {` to `export const Example = () => {`
  content = content.replace(
    /export default function (\w+)\(\) {/,
    "export const Example = () => {",
  )
  return content
}
