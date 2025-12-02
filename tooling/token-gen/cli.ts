#!/usr/bin/env node
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { search } from "@inquirer/prompts";
import { Command } from "commander";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface TokensFile {
  [key: string]: unknown;
}

const TOKENS_PATH = join(__dirname, "raw/tokens.json");
const OUTPUT_PATH = join(__dirname, "tokens/base.json");

// Reserved theme that is always included
const GLOBAL_THEME = "global";

function getAvailableThemes(): string[] {
  const tokens: TokensFile = JSON.parse(readFileSync(TOKENS_PATH, "utf-8"));
  return Object.keys(tokens).filter(
    (key) => key !== GLOBAL_THEME && !key.startsWith("$")
  );
}

function generateTokens(selectedTheme: string): void {
  const themesArg = [GLOBAL_THEME, selectedTheme].join(",");

  console.log(`\nGenerating tokens with themes: ${themesArg}`);
  console.log("─".repeat(40));

  try {
    // Run token-transformer
    execSync(
      `pnpx token-transformer "${TOKENS_PATH}" "${OUTPUT_PATH}" ${themesArg}`,
      {
        stdio: "inherit",
        cwd: __dirname,
      }
    );

    // Run build.ts to generate CSS
    execSync("tsx build.ts", {
      stdio: "inherit",
      cwd: __dirname,
    });

    console.log("\n✅ Token generation complete!");
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
  .description("🎨 OUI Style Dictionary Theme Generator")
  .version("0.0.0");

program
  .option("-t, --theme <theme>", "Theme to generate")
  .option("-l, --list", "List available themes")
  .action(async (options: { theme?: string; list?: boolean }) => {
    console.log("🎨 OUI Style Dictionary Theme Generator");
    console.log("═".repeat(40));

    let themes: string[];
    try {
      themes = getAvailableThemes();
    } catch (error) {
      console.error("❌ Error reading tokens.json:", error);
      process.exit(1);
    }

    if (themes.length === 0) {
      console.log("No themes found in tokens.json (other than global).");
      process.exit(0);
    }

    // List themes
    if (options.list) {
      console.log("\nAvailable themes:");
      console.log("─".repeat(40));
      themes.forEach((theme, index) => {
        console.log(`  ${index + 1}. ${theme}`);
      });
      console.log("─".repeat(40));
      console.log(`\nNote: "${GLOBAL_THEME}" theme is always included.\n`);
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
    generateTokens(selectedTheme);
  });

program.parse();
