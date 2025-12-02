#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, readFileSync, mkdirSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

import { search } from "@inquirer/prompts";
import { Command } from "commander";

const __dirname = dirname(fileURLToPath(import.meta.url));

// When running from source (tsx cli.ts), use local paths
// When running as installed binary, use paths relative to the package
const PACKAGE_ROOT = __dirname.endsWith("dist")
  ? dirname(__dirname)
  : __dirname;

interface TokensFile {
  [key: string]: unknown;
}

// Reserved theme that is always included
const GLOBAL_THEME = "global";

function getTokensPath(cwd: string): string {
  // First check if tokens.json exists in current working directory
  const cwdTokensPath = join(cwd, "tokens.json");
  if (existsSync(cwdTokensPath)) {
    return cwdTokensPath;
  }

  // Fall back to package's raw/tokens.json
  const packageTokensPath = join(PACKAGE_ROOT, "raw/tokens.json");
  if (existsSync(packageTokensPath)) {
    return packageTokensPath;
  }

  throw new Error(
    "tokens.json not found. Please provide a tokens.json file in the current directory."
  );
}

function getOutputPath(cwd: string): string {
  return join(cwd, "tokens/base.json");
}

function getAvailableThemes(tokensPath: string): string[] {
  const tokens: TokensFile = JSON.parse(readFileSync(tokensPath, "utf-8"));
  return Object.keys(tokens).filter(
    (key) => key !== GLOBAL_THEME && !key.startsWith("$")
  );
}

function generateTokens(
  selectedTheme: string,
  tokensPath: string,
  outputPath: string
): void {
  const themesArg = [GLOBAL_THEME, selectedTheme].join(",");

  console.log(`\nGenerating tokens with themes: ${themesArg}`);
  console.log(`Input: ${tokensPath}`);
  console.log(`Output: ${outputPath}`);
  console.log("─".repeat(40));

  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Run token-transformer
    execSync(
      `pnpx token-transformer "${tokensPath}" "${outputPath}" ${themesArg}`,
      {
        stdio: "inherit",
        cwd: process.cwd(),
      }
    );

    console.log("\n✅ Token generation complete!");
    console.log(`Output written to: ${outputPath}`);
  } catch (error) {
    console.error("\n❌ Error generating tokens:", error);
    process.exit(1);
  }
}

/**
 * Simple fuzzy match - checks if all characters in the query appear in order in the target
 */
function fuzzyMatch(query: string, target: string): boolean {
  const queryLower = query.toLowerCase();
  const targetLower = target.toLowerCase();

  let queryIndex = 0;
  for (
    let i = 0;
    i < targetLower.length && queryIndex < queryLower.length;
    i++
  ) {
    if (targetLower[i] === queryLower[queryIndex]) {
      queryIndex++;
    }
  }

  return queryIndex === queryLower.length;
}

async function interactiveMode(themes: string[]): Promise<string> {
  const selectedTheme = await search({
    message: `Select a theme to generate (${GLOBAL_THEME} is always included):`,
    source: async (input) => {
      if (!input) {
        return themes.map((theme) => ({
          name: theme,
          value: theme,
        }));
      }

      // Filter themes based on fuzzy search
      return themes
        .filter((theme) => fuzzyMatch(input, theme))
        .map((theme) => ({
          name: theme,
          value: theme,
        }));
    },
  });

  return selectedTheme;
}

const program = new Command();

program
  .name("oui-token-gen")
  .description("🎨 OUI Tailwind Variables Theme Generator")
  .version("0.0.1");

program
  .command("generate")
  .description("Generate design tokens for a theme")
  .option("-t, --theme <theme>", "Theme to generate")
  .option("-i, --input <path>", "Path to tokens.json file")
  .option("-o, --output <path>", "Output path for generated tokens")
  .action(
    async (options: { theme?: string; input?: string; output?: string }) => {
      console.log("🎨 OUI Tailwind Variables Theme Generator");
      console.log("═".repeat(40));

      const cwd = process.cwd();

      let tokensPath: string;
      try {
        tokensPath = options.input
          ? resolve(cwd, options.input)
          : getTokensPath(cwd);
      } catch (error) {
        console.error(`❌ ${(error as Error).message}`);
        process.exit(1);
      }

      const outputPath = options.output
        ? resolve(cwd, options.output)
        : getOutputPath(cwd);

      let themes: string[];
      try {
        themes = getAvailableThemes(tokensPath);
      } catch (error) {
        console.error("❌ Error reading tokens.json:", error);
        process.exit(1);
      }

      if (themes.length === 0) {
        console.log("No themes found in tokens.json (other than global).");
        process.exit(0);
      }

      let selectedTheme: string;

      // Generate specific theme from CLI argument
      if (options.theme) {
        if (themes.includes(options.theme)) {
          selectedTheme = options.theme;
        } else {
          console.error(`❌ Unknown theme: "${options.theme}"`);
          console.log("\nAvailable themes:");
          themes.forEach((theme) => console.log(`  - ${theme}`));
          process.exit(1);
        }
      }
      // Interactive mode with fuzzy search
      else {
        selectedTheme = await interactiveMode(themes);
      }

      console.log(`\nSelected theme: ${selectedTheme}`);
      generateTokens(selectedTheme, tokensPath, outputPath);
    }
  );

program
  .command("list")
  .description("List available themes")
  .option("-i, --input <path>", "Path to tokens.json file")
  .action((options: { input?: string }) => {
    console.log("🎨 OUI Tailwind Variables Theme Generator");
    console.log("═".repeat(40));

    const cwd = process.cwd();

    let tokensPath: string;
    try {
      tokensPath = options.input
        ? resolve(cwd, options.input)
        : getTokensPath(cwd);
    } catch (error) {
      console.error(`❌ ${(error as Error).message}`);
      process.exit(1);
    }

    let themes: string[];
    try {
      themes = getAvailableThemes(tokensPath);
    } catch (error) {
      console.error("❌ Error reading tokens.json:", error);
      process.exit(1);
    }

    if (themes.length === 0) {
      console.log("No themes found in tokens.json (other than global).");
      process.exit(0);
    }

    console.log(`\nTokens file: ${tokensPath}`);
    console.log("\nAvailable themes:");
    console.log("─".repeat(40));
    themes.forEach((theme, index) => {
      console.log(`  ${index + 1}. ${theme}`);
    });
    console.log("─".repeat(40));
    console.log(`\nNote: "${GLOBAL_THEME}" theme is always included.\n`);
  });

program.parse();
