#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync } from "fs";
import { dirname, resolve } from "path";

import { search } from "@inquirer/prompts";
import { Command } from "commander";
import { run } from "./run";

interface TokensFile {
  [key: string]: unknown;
  $themes: Record<string, unknown>;
}

function getAvailableThemes(): string[] {
  const tokens: TokensFile = JSON.parse(
    readFileSync("./raw/tokens.json", "utf-8")
  );
  return Object.values(tokens.$themes).map(
    (key) => (key as { name: string }).name
  );
}

function generateTokens(selectedTheme: string, outputPath: string): void {
  console.log(`\nGenerating theme: ${selectedTheme}`);
  console.log(`Output: ${outputPath}`);
  console.log("─".repeat(40));

  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  try {
    run(selectedTheme, outputPath);
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
    message: `Select a theme to generate:`,
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
  .option("-o, --output <path>", "Relative output path for generated tokens")
  .action(async (options: { theme?: string; output?: string }) => {
    console.log("🎨 OUI Tailwind Variables Theme Generator");
    console.log("═".repeat(40));

    const cwd = process.cwd();

    const outputPath = options.output ? resolve(cwd, options.output) : cwd;

    let themes: string[];
    try {
      themes = getAvailableThemes();
    } catch (error) {
      console.error("❌ Error reading tokens.json:", error);
      process.exit(1);
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
    generateTokens(selectedTheme, outputPath);
  });

program
  .command("list")
  .description("List available themes")
  .action(() => {
    console.log("🎨 OUI Tailwind Variables Theme Generator");
    console.log("═".repeat(40));

    let themes: string[];
    try {
      themes = getAvailableThemes();
    } catch (error) {
      console.error("❌ Error reading tokens.json:", error);
      process.exit(1);
    }

    console.log("\nAvailable themes:");
    console.log("─".repeat(40));
    themes.forEach((theme, index) => {
      console.log(`  ${index + 1}. ${theme}`);
    });
  });

program.parse();
