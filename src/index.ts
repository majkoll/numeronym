export type CaseTransform = "uppercase" | "lowercase" | "capitalize";

export interface ToNumeronymOptions {
  /**
   * Separator to use between converted words in multi-word inputs
   * @default ' ' (space)
   */
  separator?: string;
  /**
   * Transform the case of the numeronym result
   * - 'uppercase': Convert to all uppercase (e.g., 'I18N')
   * - 'lowercase': Convert to all lowercase (e.g., 'i18n')
   * - 'capitalize': Capitalize first letter (e.g., 'I18n')
   * @default undefined (preserves original case)
   */
  transform?: CaseTransform;
  /**
   * Minimum word length to convert to numeronym
   * Words shorter than this will be left unchanged
   * @default 4
   */
  minLength?: number;
}

/**
 * Splits a string into an array of grapheme clusters (user-perceived characters)
 * This handles emoji, combining characters, and other complex Unicode correctly.
 */
function getGraphemes(text: string): string[] {
  // Use Intl.Segmenter for Unicode-safe grapheme cluster splitting
  // Available in Node 16+ and modern browsers
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  }

  // Fallback to simple character array (not Unicode-safe, but works for ASCII)
  return [...text];
}

/**
 * Apply case transformation to a string
 */
function applyTransform(text: string, transform?: CaseTransform): string {
  if (!transform) {
    return text;
  }

  switch (transform) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "capitalize":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
}

/**
 * Converts a single word to its numeronym form
 * Uses grapheme clusters for proper Unicode handling
 */
function convertWord(
  word: string,
  transform?: CaseTransform,
  minLength = 4,
): string {
  const graphemes = getGraphemes(word);

  // Words shorter than minLength remain unchanged
  // Also need at least 2 characters to create a numeronym (first + last)
  if (graphemes.length < minLength || graphemes.length < 2) {
    return applyTransform(word, transform);
  }

  const first = graphemes[0];
  const last = graphemes[graphemes.length - 1];
  const middle = graphemes.length - 2;

  // If middle would be negative or zero, just return the word
  if (middle <= 0) {
    return applyTransform(word, transform);
  }

  const result = `${first}${middle}${last}`;
  return applyTransform(result, transform);
}

/**
 * Converts a word or multi-word phrase into a numeronym.
 *
 * A numeronym is a number-based word where the number represents
 * the count of letters between the first and last letter.
 *
 * This function properly handles Unicode including emoji, accented characters,
 * and other complex grapheme clusters.
 *
 * @param input - The word or phrase to convert
 * @param options - Optional configuration
 * @returns The numeronym string
 *
 * @example
 * ```ts
 * toNumeronym('internationalization') // 'i18n'
 * toNumeronym('hello world') // 'h3o w3d'
 * toNumeronym('hello world', { separator: '-' }) // 'h3o-w3d'
 * toNumeronym('hello world', { transform: 'capitalize' }) // 'H3o W3d'
 * toNumeronym('hello world', { transform: 'uppercase' }) // 'H3O W3D'
 * toNumeronym('HELLO WORLD', { transform: 'lowercase' }) // 'h3o w3d'
 * toNumeronym('café') // 'c2é'
 * toNumeronym('hello👋world') // 'h9d'
 * toNumeronym('the big word', { minLength: 4 }) // 'the big w2d'
 * ```
 */
export function toNumeronym(
  input: string,
  options?: ToNumeronymOptions,
): string {
  const { separator = " ", transform, minLength = 4 } = options ?? {};

  // Handle empty string
  if (input.length === 0) {
    return input;
  }

  // Split by whitespace to handle multi-word inputs
  const words = input.split(/\s+/);

  // Convert each word and join with separator
  return words
    .map((word) => convertWord(word, transform, minLength))
    .join(separator);
}
