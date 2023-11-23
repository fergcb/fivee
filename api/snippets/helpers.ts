import Handlebars from "npm:handlebars";
import * as marked from "npm:marked";
import { ClassList } from "$snippets/themes.ts";

const PLURAL_RULES = new Intl.PluralRules("en", { type: "ordinal" });
const ORDINAL_SUFFIXES = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);

function createRenderer(classes: ClassList): marked.Renderer {
  const renderer = new marked.Renderer();

  renderer.list = function (body, ordered) {
    const tag = ordered ? "ol" : "ul";
    const subclass = ordered
      ? classes["list-ordered"]
      : classes["list-unordered"];
    return `<${tag} class="${classes.list} ${subclass}">${body}</${tag}>`;
  };

  renderer.listitem = function (body) {
    return `<li class="${classes.list__item}">${body}</li>`;
  };

  renderer.paragraph = function (text) {
    return `<p class="${classes.paragraph}">${text}</p>`;
  };

  return renderer;
}

/**
 * Render Markdown text as HTML
 */
export function md(
  // deno-lint-ignore no-explicit-any
  this: any,
  source: string,
): string {
  return marked.parse(source, { renderer: createRenderer(this.class) });
}

/**
 * Render inline Markdown text as HTML
 */
export function mdi(
  // deno-lint-ignore no-explicit-any
  this: any,
  source: string,
): string {
  return marked.parseInline(source, {
    renderer: createRenderer(this.class),
  }) as string;
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
  names: string,
): Handlebars.SafeString | undefined {
  const classNames = names
    .split(/\s+/g)
    .flatMap((name) => {
      if (typeof this.class[name] !== "string") return "";
      return this.class[name].split(/\s+/g);
    })
    .toSorted();
  const uniqueClassnames = [...new Set(classNames)];
  const classString = uniqueClassnames.join(" ");
  return new Handlebars.SafeString(`class="${classString}"`);
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
