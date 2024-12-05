import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("component", {
    description: "Adds a new UI component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/components/src/{{ kebabCase name }}/{{ kebabCase name }}.tsx",
        templateFile: "templates/component/component.hbs",
      },
      {
        type: "add",
        path: "packages/components/src/{{ kebabCase name }}/stories/{{ kebabCase name }}.stories.tsx",
        templateFile: "templates/component/stories.hbs",
      },
      {
        type: "add",
        path: "packages/theme/src/components/{{ kebabCase name }}.ts",
        templateFile: "templates/component/theme.hbs",
      },
      {
        type: "modify",
        path: "packages/theme/src/components/index.ts",
        pattern: /\/\/ Add new theme exports here/g,
        template:
          'export * from "./{{kebabCase name}}";\n// Add new theme exports here',
      },
      {
        type: "append",
        path: "packages/components/package.json",
        pattern: /"exports": {(?<insertion>)/g,
        template: `    "./{{kebabCase name}}": {
      "types": "./src/{{kebabCase name}}.tsx",
      "import": "./dist/{{kebabCase name}}.mjs",
      "require": "./dist/{{kebabCase name}}.js"
    },`,
      },
    ],
  });
}
