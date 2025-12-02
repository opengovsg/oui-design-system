#!/usr/bin/env node
import { execSync } from "child_process";
import { createInterface } from "readline";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

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

function displayThemes(themes: string[]): void {
  console.log("\nAvailable themes:");
  console.log("─".repeat(40));
  themes.forEach((theme, index) => {
    console.log(`  ${index + 1}. ${theme}`);
  });
  console.log("─".repeat(40));
  console.log(`\nNote: "${GLOBAL_THEME}" theme is always included.\n`);
}

function generateTokens(selectedThemes: string[]): void {
  const themesArg = [GLOBAL_THEME, ...selectedThemes].join(",");

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

async function promptForThemes(themes: string[]): Promise<string[]> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "Enter theme numbers (comma-separated) or theme names: ",
      (answer) => {
        rl.close();

        const input = answer.trim();
        if (!input) {
          console.log("No themes selected. Using all available themes.");
          resolve(themes);
          return;
        }

        const selectedThemes: string[] = [];
        const parts = input.split(",").map((p) => p.trim());

        for (const part of parts) {
          // Check if it's a number
          const num = parseInt(part, 10);
          if (!isNaN(num) && num >= 1 && num <= themes.length) {
            selectedThemes.push(themes[num - 1]!);
          } else if (themes.includes(part)) {
            // Check if it's a theme name
            selectedThemes.push(part);
          } else {
            console.warn(`⚠️  Unknown theme: "${part}" (skipping)`);
          }
        }

        if (selectedThemes.length === 0) {
          console.log("No valid themes selected. Using all available themes.");
          resolve(themes);
        } else {
          resolve([...new Set(selectedThemes)]); // Remove duplicates
        }
      }
    );
  });
}

function parseCliArgs(args: string[], themes: string[]): string[] | null {
  // Look for --theme or -t flag
  const themeIndex = args.findIndex((arg) => arg === "--theme" || arg === "-t");
  if (themeIndex !== -1 && args[themeIndex + 1]) {
    const themeArg = args[themeIndex + 1]!;
    const requestedThemes = themeArg.split(",").map((t) => t.trim());

    const validThemes: string[] = [];
    for (const theme of requestedThemes) {
      if (themes.includes(theme)) {
        validThemes.push(theme);
      } else {
        console.warn(`⚠️  Unknown theme: "${theme}" (skipping)`);
      }
    }

    return validThemes.length > 0 ? validThemes : null;
  }

  // Look for --all or -a flag
  if (args.includes("--all") || args.includes("-a")) {
    return themes;
  }

  // Look for --list or -l flag
  if (args.includes("--list") || args.includes("-l")) {
    return null; // Will trigger list display
  }

  return undefined as unknown as string[] | null; // No flags provided, will trigger interactive mode
}

function showHelp(): void {
  console.log(`
Usage: tsx cli.ts [options]

Options:
  -t, --theme <themes>  Comma-separated list of themes to generate
  -a, --all             Generate all available themes
  -l, --list            List available themes
  -h, --help            Show this help message

Examples:
  tsx cli.ts                      # Interactive mode
  tsx cli.ts --theme Postman      # Generate Postman theme
  tsx cli.ts -t Postman,OtherTheme  # Generate multiple themes
  tsx cli.ts --all                # Generate all themes
  tsx cli.ts --list               # List available themes
`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // Show help
  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    process.exit(0);
  }

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

  // Check for --list flag
  if (args.includes("--list") || args.includes("-l")) {
    displayThemes(themes);
    process.exit(0);
  }

  // Parse CLI arguments
  const cliThemes = parseCliArgs(args, themes);

  let selectedThemes: string[];

  if (cliThemes === undefined) {
    // Interactive mode
    displayThemes(themes);
    selectedThemes = await promptForThemes(themes);
  } else if (cliThemes === null) {
    console.error("❌ No valid themes specified.");
    process.exit(1);
  } else {
    selectedThemes = cliThemes;
  }

  console.log(`\nSelected themes: ${selectedThemes.join(", ")}`);
  generateTokens(selectedThemes);
}

main().catch(console.error);
