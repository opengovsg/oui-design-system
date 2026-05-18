import { readdir, writeFile } from "fs/promises"
import { join } from "path"

async function generateRegistry() {
  const REGISTRY_DIR = "registry/examples"
  const OUTPUT_FILE = "__registry__/index.ts"

  // Get all .tsx files from registry directory
  const files = await readdir(join(process.cwd(), REGISTRY_DIR))
  const examples = files.filter((file) => file.endsWith(".tsx"))

  // Generate the registry content
  const content = `// This file is auto-generated. Do not edit manually.
import { lazy } from "react"

type RegistryComponent = {
  name: string
  description: string
  type: string
  files?: {
    path: string
  }[]
  component: React.LazyExoticComponent<React.ComponentType>
}

export const Index: Record<string, RegistryComponent> = {
${examples
  .map((file) => {
    const name = file.replace(".tsx", "")
    const path = `${REGISTRY_DIR}/${file}`

    return `  "${name}": {
    name: "${name}",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "${path}",
      },
    ],
    component: lazy(() => import("@/${path}")),
  }`
  })
  .join(",\n")}
}
`

  // Write the file
  await writeFile(OUTPUT_FILE, content, "utf-8")
  console.log(`Registry file generated at ${OUTPUT_FILE}`)
}

generateRegistry().catch(console.error)
