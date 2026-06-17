import { readFile } from "node:fs/promises"
import path from "node:path"

/**
 * Reads `<examplesDir>/<name>.tsx`, strips the "use client" pragma, and
 * rewrites the default export so the snippet is self-contained when shown to
 * an agent. Mirrors `lib/mdx.ts#readRegistryFile` so the generated markdown
 * matches the docs site's code-tab content.
 */
export async function loadExample(
  examplesDir: string,
  name: string,
): Promise<string> {
  const filePath = path.join(examplesDir, `${name}.tsx`)
  let content: string
  try {
    content = await readFile(filePath, "utf8")
  } catch {
    throw new Error(`Example file not found: ${name} (looked at ${filePath})`)
  }

  return content
    .replace(/^["']use client["'];?\s*\n?/m, "")
    .replace(
      /export default function (\w+)\(\) {/,
      "export const Example = () => {",
    )
    .trim()
}
