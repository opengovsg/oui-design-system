// apps/www/scripts/registry/transform.test.ts
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { Project } from "ts-morph"
import { describe, expect, it } from "vitest"

import { buildCatalog } from "./catalog"
import { transformSourceFile } from "./transform"

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(HERE, "../../../..")

const catalog = buildCatalog()

function tx(input: string, sourcePath = "/virtual/button.tsx") {
  const project = new Project({ useInMemoryFileSystem: true })
  const file = project.createSourceFile(sourcePath, input)
  return transformSourceFile(file, catalog)
}

describe("transformSourceFile", () => {
  it("preserves 'use client' pragma", () => {
    const { code } = tx(`"use client"\n\nimport React from "react"\n`)
    expect(code.startsWith(`"use client"`)).toBe(true)
  })

  it("leaves external imports unchanged and records them in deps", () => {
    const { code, deps } = tx(
      `import { Button } from "react-aria-components"\n`,
    )
    expect(code).toContain(`from "react-aria-components"`)
    expect(deps.has("react-aria-components")).toBe(true)
  })

  it("rewrites sibling component imports and records a registryDependency", () => {
    const { code, registryDeps } = tx(`import { Spinner } from "../spinner"\n`)
    expect(code).toContain(`from "@/components/oui/spinner"`)
    expect(registryDeps.has("spinner")).toBe(true)
  })

  it("rewrites deep internal util imports to @/lib/oui/<name>", () => {
    const { code, libDeps } = tx(
      `import { renderChildren } from "../system/react-utils/children"\n`,
    )
    expect(code).toContain(`from "@/lib/oui/children"`)
    expect(libDeps.has("children")).toBe(true)
  })

  it("splits a mixed @opengovsg/oui-theme import into variant + lib imports", () => {
    const { code, libDeps, inlineVariants } = tx(
      `import { buttonStyles, ButtonVariantProps, cn } from "@opengovsg/oui-theme"\n`,
      "/virtual/button.tsx",
    )
    expect(code).toContain(`from "./button.variants"`)
    expect(code).toContain(`from "@/lib/oui/cn"`)
    expect(libDeps.has("cn")).toBe(true)
    expect(inlineVariants.has("button")).toBe(true)
  })

  it("rewrites barrel imports into per-lib imports", () => {
    const { code, libDeps } = tx(
      `import { createContext, useDomRef } from "../system/react-utils"\n`,
    )
    // createContext → context lib; useDomRef → refs lib
    expect(code).toContain(`from "@/lib/oui/context"`)
    expect(code).toContain(`from "@/lib/oui/refs"`)
    expect(libDeps.has("context")).toBe(true)
    expect(libDeps.has("refs")).toBe(true)
  })

  it("rewrites hook barrel imports to @/lib/oui/<hook-name>", () => {
    const { code, libDeps } = tx(
      `import { useControllableState } from "../hooks"\n`,
    )
    expect(code).toContain(`from "@/lib/oui/use-controllable-state"`)
    expect(libDeps.has("use-controllable-state")).toBe(true)
  })

  it("leaves same-directory relative imports untouched (multi-file components)", () => {
    const { code } = tx(
      `import { ModalBody } from "./modal-body"\n`,
      "/virtual/modal.tsx",
    )
    expect(code).toContain(`from "./modal-body"`)
  })

  it("rewrites same-dir imports in lib files to @/lib/oui/<name>", () => {
    // cn.ts lives in packages/theme/src/utils/ and imports from "./tw-merge"
    // When transformed, "./tw-merge" should become "@/lib/oui/tw-merge"
    const cnPath = join(REPO_ROOT, "packages/theme/src/utils/cn.ts")
    const project = new Project({
      skipAddingFilesFromTsConfig: true,
      compilerOptions: { allowJs: false },
    })
    const sourceFile = project.addSourceFileAtPath(cnPath)
    const result = transformSourceFile(sourceFile, catalog)
    expect(result.code).toContain(`from "@/lib/oui/tw-merge"`)
    expect(result.libDeps.has("tw-merge")).toBe(true)
  })

  it("preserves type-only modifiers", () => {
    const { code } = tx(
      `import type { ButtonProps } from "react-aria-components"\n`,
    )
    expect(code).toMatch(/import\s+type\s+\{\s*ButtonProps\s*\}/)
  })

  it("preserves unmapped @opengovsg/oui-theme symbols as theme imports", () => {
    // VariantProps is re-exported from tailwind-variants — not in variant nor lib catalog.
    // It should be preserved as a @opengovsg/oui-theme import.
    const { code, deps } = tx(
      `import { buttonStyles, VariantProps } from "@opengovsg/oui-theme"\n`,
      "/virtual/popover.tsx",
    )
    expect(code).toContain(`from "@opengovsg/oui-theme"`)
    expect(code).toMatch(/VariantProps/)
    expect(deps.has("@opengovsg/oui-theme")).toBe(true)
  })

  it("preserves bucket order in lib-barrel splits", () => {
    // createContext → context lib; useDomRef → refs lib.
    // Expected order: context first, then refs (matches input symbol order).
    const { code } = tx(
      `import { createContext, useDomRef } from "../system/react-utils"\n`,
    )
    const contextIdx = code.indexOf(`from "@/lib/oui/context"`)
    const refsIdx = code.indexOf(`from "@/lib/oui/refs"`)
    expect(contextIdx).toBeGreaterThan(-1)
    expect(refsIdx).toBeGreaterThan(-1)
    expect(contextIdx).toBeLessThan(refsIdx)
  })

  it("uses component name (not file basename) for variant import in multi-file components", () => {
    // useSpinnerStyles is in spinner.ts theme variant, so the component name is "spinner"
    // even though the source file basename is "use-spinner".
    const { code } = tx(
      `import { spinnerStyles } from "@opengovsg/oui-theme"\n`,
      "/virtual/use-spinner.ts",
    )
    expect(code).toContain(`from "./spinner.variants"`)
  })
})
