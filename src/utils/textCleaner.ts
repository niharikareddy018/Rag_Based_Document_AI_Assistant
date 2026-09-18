/**
 * Clean stars and asterisks from AI responses and text.
 * Strips **, *, *** markdown stars and converts asterisk lists to clean bullets.
 */
export function removeStarsAndAsterisks(text: string | undefined | null): string {
  if (!text) return '';

  return text
    // Replace triple asterisks ***bold-italic*** -> bold-italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '$1')
    // Replace bold **text** -> text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Replace italic *text* -> text
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '$1')
    // Replace asterisk bullets at beginning of line (* item) -> • item
    .replace(/^\s*\*\s+/gm, '• ')
    // Remove any remaining stray asterisks
    .replace(/\*/g, '')
    .trim();
}

/**
 * Cleans an array of strings (e.g. findings / key points)
 */
export function cleanFindings(findings?: string[]): string[] | undefined {
  if (!findings || findings.length === 0) return undefined;
  return findings
    .map((f) => removeStarsAndAsterisks(f))
    .filter((f) => f.length > 0);
}
