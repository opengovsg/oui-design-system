import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

// Function to generate theme token sets from the raw tokens
async function generateThemeTokens() {
  const tokens = JSON.parse(await readFile("raw/tokens.json", "utf-8"));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $themes, ...sets } = tokens;

  const persistSet = async ([setName, setTokens]) => {
    const fileName = `tokens/${setName}.json`;
    const dirName = dirname(fileName);
    try {
      await mkdir(dirName, { recursive: true });
    } catch {
      // do nothing, dir already exists
    }
    await writeFile(fileName, JSON.stringify(setTokens, null, 2), "utf-8");
  };

  // persist sets as multi file in tokens folder
  await Promise.all(Object.entries(sets).map(persistSet));
}

await generateThemeTokens();
