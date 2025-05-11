import { createRequire } from "node:module";

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

const require = createRequire(import.meta.url);

/**
 * @see https://prettier.io/docs/configuration
 * @type { PrettierConfig | SortImportsConfig | TailwindConfig }
 */
const config = {
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  bracketSpacing: true,
  semi: false,
  singleQuote: false,
  useTabs: false,
  tailwindFunctions: ["tv"],
  importOrder: [
    "<TYPES>",
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "^(expo(.*)$)|^(expo$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>^@opengovsg/oui",
    "<TYPES>^@opengovsg/oui-theme",
    "^@opengovsg/oui(.*)$",
    // "^@opengovsg/oui-theme(.*)$",
    "",
    "<TYPES>^[.|..|~]",
    "^~/",
    "^[../]",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.7.3",
};

export default config;
