/**
 * Utility to repair and parse messy or raw AI JSON responses safely.
 */
export function repairAndParseJSON(rawText) {
  if (typeof rawText !== 'string') {
    throw new Error('Input must be a string');
  }

  let cleaned = rawText.trim();

  // Strip markdown code block fences if present
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '');

  // Extract first { to last }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  // Attempt 1: Direct JSON.parse
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Continue to repair attempts
  }

  // Attempt 2: Common repairs (trailing commas, JS-style comments)
  let repaired = cleaned
    .replace(/,\s*([}\]])/g, '$1') // remove trailing commas before } or ]
    .replace(/\/\/.*/g, '')         // remove single line comments
    .replace(/\/\*[\s\S]*?\*\//g, ''); // remove block comments

  try {
    return JSON.parse(repaired);
  } catch (e) {
    throw new Error(`Failed to parse AI JSON response: ${e.message}`);
  }
}
