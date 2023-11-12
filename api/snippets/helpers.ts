import Handlebars from "npm:handlebars";
import * as marked from "npm:marked";

const PLURAL_RULES = new Intl.PluralRules("en", { type: "ordinal" });
const ORDINAL_SUFFIXES = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);

/**
 * Render Markdown text as HTML
 */
export function md(source: string): string {
  return marked.parse(source);
}

/**
 * Render inline Markdown text as HTML
 */
export function mdi(source: string): string {
  return marked.parseInline(source) as string;
}

/**
 * Convert an integer to its ordinal representation (e.g. 1 -> 1st, 42 -> 42nd)
 */
export function ordinal(n: number): string {
  const category = PLURAL_RULES.select(n);
  const suffix = ORDINAL_SUFFIXES.get(category);
  return `${n}${suffix}`;
}

/**
 * Resolve a class attribute according to the configured cssMode
 */
export function cn(
  // deno-lint-ignore no-explicit-any
  this: any,
  name: string
): Handlebars.SafeString | undefined {
  if (typeof this.class[name] !== "string" || this.class[name] === "")
    return undefined;
  return new Handlebars.SafeString(`class="${this.class[name]}"`);
}

/**
 * Concatenate a list of strings on a given separator
 */
export function join(items: string[], separator: string): string {
  return items.join(separator);
}

/**
 * Pluralize a word or phrase.
 *
 * By default, this just appends an 's' unless a specific plural
 * form is defined.
 *
 * If a `condition` parameter is passed, only pluralize if it is true.
 */
export function pluralize(text: string, condition = true): string {
  if (!condition) return text;
  switch (text) {
    case "foot":
      return "feet";
  }

  return text + "s";
}
