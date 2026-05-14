/**
 * Concatenates already-rendered per-doc markdown files into a single
 * llms-full.txt corpus, in the same order as llms.txt.
 *
 * Each section keeps its frontmatter block so agents can search within
 * the concatenated file.
 */
export function renderLlmsFullTxt(sections: string[]): string {
  return sections.join("\n\n---\n\n") + "\n"
}
