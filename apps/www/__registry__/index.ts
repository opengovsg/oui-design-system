// TODO: Autogenerate this from the registry folder

import { lazy } from "react"

type RegistryComponent = {
  name: string
  description: string
  type: string
  files?: {
    path: string
  }[]
  component: React.LazyExoticComponent<React.ComponentType<any>>
}

export const Index: Record<string, RegistryComponent> = {
  "button-demo": {
    name: "button-demo",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-demo.tsx",
      },
    ],
    component: lazy(() => import("@/registry/examples/button-demo.tsx")),
  },
  "button-with-sizes": {
    name: "button-with-sizes",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-sizes.tsx",
      },
    ],
    component: lazy(() => import("@/registry/examples/button-with-sizes.tsx")),
  },
  "button-with-variants": {
    name: "button-with-variants",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-variants.tsx",
      },
    ],
    component: lazy(
      () => import("@/registry/examples/button-with-variants.tsx"),
    ),
  },
  "button-with-icons": {
    name: "button-with-icons",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-icons.tsx",
      },
    ],
    component: lazy(() => import("@/registry/examples/button-with-icons.tsx")),
  },
  "button-with-color": {
    name: "button-with-color",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-color.tsx",
      },
    ],
    component: lazy(() => import("@/registry/examples/button-with-color.tsx")),
  },
  "button-with-disabled": {
    name: "button-with-disabled",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-disabled.tsx",
      },
    ],
    component: lazy(
      () => import("@/registry/examples/button-with-disabled.tsx"),
    ),
  },
  "button-with-loading": {
    name: "button-with-loading",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-loading.tsx",
      },
    ],
    component: lazy(
      () => import("@/registry/examples/button-with-loading.tsx"),
    ),
  },
  "button-with-spinner-placement": {
    name: "button-with-spinner-placement",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-spinner-placement.tsx",
      },
    ],
    component: lazy(
      () => import("@/registry/examples/button-with-spinner-placement.tsx"),
    ),
  },
  "button-with-custom-spinner": {
    name: "button-with-custom-spinner",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-custom-spinner.tsx",
      },
    ],
    component: lazy(
      () => import("@/registry/examples/button-with-custom-spinner.tsx"),
    ),
  },
  "button-with-radius": {
    name: "button-with-radius",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-with-radius.tsx",
      },
    ],
    component: lazy(() => import("@/registry/examples/button-with-radius.tsx")),
  },
}
