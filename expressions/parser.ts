// import { db } from "$db/database.ts";

import merge from "npm:lodash.merge";
import { ClassList } from "$snippets/themes.ts";
import { Expression } from "$exprs/expressions.ts";

export const EXPRESSION_MODES = ["text", "html", "interactive"] as const;
export type ExpressionMode = (typeof EXPRESSION_MODES)[number];

export function isValidExpressionMode(mode: unknown): mode is ExpressionMode {
  return typeof mode === "string" &&
    EXPRESSION_MODES.includes(mode as ExpressionMode);
}

export interface ParserConfig {
  mode: ExpressionMode;
  classes?: ClassList;
}

const DEFAULT_PARSER_CONFIG: ParserConfig = {
  mode: "text",
  classes: undefined,
};

async function replaceAsync(
  str: string,
  regexp: RegExp,
  replacerFunction: (match: RegExpMatchArray) => Promise<string>,
) {
  const replacements = await Promise.all(
    Array.from(str.matchAll(regexp), (match) => replacerFunction(match)),
  );
  let i = 0;
  return str.replace(regexp, () => replacements[i++]);
}

export async function parse(
  source: string,
  customConfig: Partial<ParserConfig> = {},
): Promise<string> {
  const config: ParserConfig = merge({}, DEFAULT_PARSER_CONFIG, customConfig);

  if (config.mode !== "text" && config.classes === undefined) {
    throw new Error(
      "Classes must be provided when evaluating as HTML or interactive HTML.",
    );
  }

  return await replaceAsync(
    source,
    /%{(?<expr>[^|}]+)(\|(?<text>[^}]+))?}/gm,
    async (match) => {
      const expr: string = match.groups!.expr;
      const text: string | undefined = match.groups!.text;

      const expression = Expression.from(expr, text, match[0]);

      const validationResult = await expression.validate();
      if (validationResult.kind === "error") {
        console.error(new Error(validationResult.message));
        return match[0];
      }

      try {
        switch (config.mode) {
          case "text":
            return expression.evaluateAsText();
          case "html":
            return expression.evaluateAsHtml(config.classes!);
          case "interactive":
            return expression.evaluateAsInteractiveHtml(config.classes!);
        }
      } catch (err) {
        console.error(err);
        return match[0];
      }
    },
  );
}

export async function parseValue<T extends object>(
  value: T,
  config: Partial<ParserConfig> = {},
  visited: Set<object> = new Set(),
): Promise<T> {
  if (Array.isArray(value)) {
    return Promise.all(
      value.map((el) => parseValue(el, config, visited)),
    ) as Promise<T>;
  }

  if (typeof value === "string") {
    return await parse(value, config) as unknown as T;
  }

  if (typeof value === "object" && value !== null && !visited.has(value)) {
    visited.add(value);
    return await parseTextFields(value, config, visited);
  }

  return value;
}

export async function parseTextFields<T extends object>(
  obj: T,
  config: Partial<ParserConfig> = {},
  visited: Set<object> = new Set(),
): Promise<T> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(obj).map(async (
        [key, value],
      ) => [key, await parseValue(value, config, visited)]),
    ),
  ) as T;
}
