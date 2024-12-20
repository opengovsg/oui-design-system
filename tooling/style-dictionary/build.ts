import { fileHeader } from "style-dictionary/utils";
import { dirname, join } from "path";
import type { TransformedTokens } from "style-dictionary";
import { flatten } from "flat";
import {
  camelCase,
  cloneDeep,
  isObject,
  kebabCase,
  merge,
  omit,
  pick,
} from "lodash-es";
import StyleDictionary from "style-dictionary";
import tinycolor from "tinycolor2";

import { fontWeightToNumber, percentToEm, pxToRem } from "./utils";

// Convert shadow to css format.
StyleDictionary.registerTransform({
  name: "ogp/box-shadow",
  type: "value",
  filter: (prop) => prop.type === "boxShadow",
  transform(prop) {
    // destructure shadow values from original token value
    const { x, y, blur, spread, color, alpha } = prop.original.value;

    // convert hex code to rgba string
    const shadowColor = tinycolor(color);
    if (alpha) shadowColor.setAlpha(alpha);

    shadowColor.toRgbString();

    return `${x}px ${y}px ${blur}px ${spread}px ${shadowColor}`;
  },
});

// Convert textStyles to css class.
StyleDictionary.registerTransform({
  name: "ogp/typography",
  type: "value",
  filter: (prop) => prop.type === "typography",
  transform: (token) => {
    return {
      fontFamily:
        token.value.fontFamily === "Inter"
          ? "var(--font-sans)"
          : "var(--font-mono)",
      textTransform: token.value.textCase,
      textDecoration: token.value.textDecoration,
      fontSize: pxToRem(token.value.fontSize),
      fontWeight: fontWeightToNumber(token.value.fontWeight),
      lineHeight: pxToRem(token.value.lineHeight),
      letterSpacing: percentToEm(token.value.letterSpacing),
    };
  },
});

StyleDictionary.registerTransform({
  name: "ogp/spacing",
  type: "value",
  filter(prop) {
    return ["spacing", "border-radius", "border-width", "sizing"].includes(
      String(prop.attributes?.category) ?? ""
    );
  },
  transform(prop) {
    // Only convert pure numbers to px.
    // If it is not a number, it is most likely a string like "2px" or "50%" already.
    const numValue = Number(prop.original.value);
    if (isNaN(numValue)) return prop.original.value;
    // You can also modify the value here if you want to convert pixels to ems
    return `${numValue}px`;
  },
});

StyleDictionary.registerFormat({
  name: "css/ogp",
  async format({ dictionary }) {
    const css = [`@theme {`];

    // Only handle color
    for (const prop of dictionary.allTokens) {
      if (prop.attributes?.category !== "color") {
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
    );

    // Add utility classes for typography

    for (const [key, value] of Object.entries(typography)) {
      css.push(`@utility prose-${key} {`);
      // @ts-ignore
      const cssValues = Object.entries(value.value);
      cssValues.forEach(([cssKey, cssValue]) => {
        css.push(`    ${kebabCase(cssKey)}: ${cssValue};`);
      });
      css.push("  }\n");
    }

    return css.join("\n");
  },
});

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS
["base"].map(async function (theme) {
  console.log("\n==============================================");
  console.log(`\nProcessing: [${theme}]`);
  const sd = new StyleDictionary({
    source: ["tokens/**/*.json"],
    platforms: {
      web: {
        transforms: [
          "attribute/cti",
          "name/kebab",
          "size/pxToRem",
          "ogp/box-shadow",
          "ogp/typography",
          "color/css",
        ],
        // Absolute path depending on build script
        buildPath: `${join(dirname("../"))}/`,
        files: [
          {
            destination: `generated/generated.css`,
            format: "css/ogp",
          },
        ],
      },
    },
  });

  await sd.hasInitialized;
  await sd.buildPlatform("web");
  console.log("\nEnd processing");
});

console.log("\n==============================================");
console.log("\nBuild completed!");
