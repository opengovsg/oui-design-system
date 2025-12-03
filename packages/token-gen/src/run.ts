import { flatten } from "flat";
import { cloneDeep, isObject, kebabCase, merge, omit, pick } from "lodash-es";
import type { Config } from "style-dictionary";
import StyleDictionary from "style-dictionary";

import { permutateThemes, register } from "@tokens-studio/sd-transforms";
import { readFile } from "fs/promises";
import { transforms } from "style-dictionary/enums";
import type { DesignToken, TransformedTokens } from "style-dictionary/types";
import { fontWeightToNumber, percentToEm, pxToRem } from "./utils";
import { dirname, resolve } from "path";

register(StyleDictionary);

const transformTypographyToTailwindUtil = (
  token: DesignToken
): DesignToken["value"] => {
  const val = token.$value ?? token.value;
  if (val === undefined) return undefined;

  const transformed = {
    fontFamily:
      val.fontFamily === "Inter" ? "var(--font-sans)" : "var(--font-mono)",
    textTransform: val.textCase,
    textDecoration: val.textDecoration,
    fontSize: pxToRem(val.fontSize),
    fontWeight: fontWeightToNumber(val.fontWeight),
    lineHeight: pxToRem(val.lineHeight),
    letterSpacing: percentToEm(val.letterSpacing),
  };

  return transformed;
};

// Convert textStyles to css class.
StyleDictionary.registerTransform({
  name: "ogp/typography",
  type: "value",
  transitive: true,
  filter: (token) => (token.$type ?? token.type) === "typography",
  transform: transformTypographyToTailwindUtil,
});

StyleDictionary.registerFormat({
  name: "css/ogp",
  async format({ dictionary }) {
    const css = [`@theme {`];

    for (const prop of dictionary.allTokens) {
      // Ignore specific categories
      if (!["color", "shadow"].includes(prop.attributes?.category as string)) {
        continue;
      }
      // Ignore objects, they are probably nested tokens that we do not need to process.
      if (!isObject(prop.value)) {
        css.push(`  --${kebabCase(prop.path.join("-"))}: ${prop.value};`);
      }
    }

    css.push("}\n");

    // Special handling for nested styles, flatten them.
    const responsiveTypography = flatten(
      pick(dictionary.tokens.typography, [
        "responsive-heading",
        "responsive-display",
      ]),
      {
        delimiter: "-",
        maxDepth: 2,
      }
    );

    const unneededTypographyKeys = [
      "fontFamilies",
      "lineHeights",
      "fontWeights",
      "fontSize",
      "letterSpacing",
      "paragraphSpacing",
      "textCase",
      "textDecoration",
      // Already processed above
      "responsive-heading",
      "responsive-display",
    ];
    const typography = merge(
      cloneDeep(omit(dictionary.tokens.typography, unneededTypographyKeys)),
      responsiveTypography
    ) as TransformedTokens;

    // Add utility classes for typography

    for (const [key, value] of Object.entries(typography)) {
      css.push(`@utility prose-${key} {`);
      const cssValues = Object.entries(value.value);
      cssValues.forEach(([cssKey, cssValue]) => {
        css.push(`    ${kebabCase(cssKey)}: ${cssValue};`);
      });
      css.push("  }\n");
    }

    return css.join("\n");
  },
});

export async function run(theme: string, outputDirPath: string) {
  const rawTokensPath = resolve(
    dirname(new URL(import.meta.url).pathname),
    "../raw/tokens.json"
  );
  const rawTokens = JSON.parse(await readFile(rawTokensPath, "utf-8"));
  const { $themes, ...sets } = rawTokens;

  const tokenPath = resolve(
    dirname(new URL(import.meta.url).pathname),
    "../tokens"
  );

  const themes = permutateThemes($themes, { separator: "_" });
  const configs = Object.entries(themes)
    .filter(([name]) => name === theme)
    .map(([name, tokensets]) => ({
      source: Object.keys(sets)
        .filter((setName) => (tokensets as string).includes(setName))
        .map((setName) => `${tokenPath}/${setName}.json`),
      preprocessors: ["tokens-studio"],
      platforms: {
        css: {
          transforms: [
            "ogp/typography",
            "ts/descriptionToComment",
            "ts/resolveMath",
            "ts/size/px",
            "ts/opacity",
            "ts/color/modifiers",
            "ts/color/css/hexrgba",
            "ts/shadow/innerShadow",
            transforms.attributeCti,
            transforms.nameKebab,
            transforms.timeSeconds,
            transforms.htmlIcon,
            transforms.sizeRem,
            transforms.colorCss,
            transforms.assetUrl,
            transforms.cubicBezierCss,

            transforms.strokeStyleCssShorthand,
            transforms.borderCssShorthand,
            transforms.transitionCssShorthand,
            transforms.shadowCssShorthand,
          ],
          files: [
            {
              destination: `${outputDirPath}/generated-${name}.css`,
              format: "css/ogp",
            },
          ],
        },
      },
    })) satisfies Config[];

  async function cleanAndBuild(cfg: Config) {
    const sd = new StyleDictionary(cfg);
    await sd.cleanAllPlatforms(); // optionally, cleanup files first..
    await sd.buildAllPlatforms();
  }
  await Promise.all(configs.map(cleanAndBuild));
}
