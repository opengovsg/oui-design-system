// Import the a11y addon annotations
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview"
import { setProjectAnnotations } from "@storybook/react"
import { beforeAll } from "vitest"

// Optionally import your own annotations
import * as projectAnnotations from "./preview"

const project = setProjectAnnotations([
  // Add the a11y addon annotations
  a11yAddonAnnotations,
  projectAnnotations,
])

beforeAll(project.beforeAll)
