// apps/www/scripts/registry/install.test.ts
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { afterEach, describe, expect, it } from "vitest"

import { installManifest } from "./install"
import type { RegistryItem } from "./types"

let dirs: string[] = []
afterEach(() => {
  for (const d of dirs) rmSync(d, { recursive: true, force: true })
  dirs = []
})

const manifest: RegistryItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "button",
  type: "registry:ui",
  files: [
    {
      path: "components/oui/button.tsx",
      content: "export const Button = () => null\n",
      type: "registry:ui",
      target: "components/oui/button.tsx",
    },
    {
      path: "lib/oui/cn.ts",
      content: "export const cn = () => ''\n",
      type: "registry:lib",
      target: "lib/oui/cn.ts",
    },
  ],
}

describe("installManifest", () => {
  it("writes every file to root/<target>", () => {
    const root = mkdtempSync(join(tmpdir(), "fixture-"))
    dirs.push(root)
    installManifest(manifest, root)

    expect(readFileSync(join(root, "components/oui/button.tsx"), "utf-8")).toBe(
      "export const Button = () => null\n",
    )
    expect(readFileSync(join(root, "lib/oui/cn.ts"), "utf-8")).toBe(
      "export const cn = () => ''\n",
    )
  })

  it("creates intermediate directories", () => {
    const root = mkdtempSync(join(tmpdir(), "fixture-"))
    dirs.push(root)
    installManifest(manifest, root)
    // No exception = pass
  })
})
