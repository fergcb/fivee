import Handlebars from "npm:handlebars";
import { BEM_CLASSES, ThemeName, TW_THEMES } from "$snippets/themes.ts";
import * as helpers from "$snippets/helpers.ts";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
import pretty from "npm:pretty";
import merge from "npm:lodash.merge";
import { ParserConfig, parseTextFields } from "$exprs/parser.ts";

const SNIPPETS_DIR = path.dirname(path.fromFileUrl(import.meta.url));
const TEMPLATE_EXT = ".template.hbs";

const hb = Handlebars.create();
const templateCache = new Map<string, HandlebarsTemplateDelegate<unknown>>();

Object.entries(helpers).forEach(([name, fn]) => {
  hb.registerHelper(name, fn);
});

export type RenderConfig = {
  cssMode: "tw" | "bem";
  twTheme: ThemeName;
  expressions: ParserConfig["mode"] | "raw";
};

const DEFAULT_RENDER_CONFIG: RenderConfig = {
  cssMode: "bem",
  twTheme: "default",
  expressions: "text",
};

export async function render(
  view: string,
  // deno-lint-ignore no-explicit-any
  context: Record<string, any>,
  customConfig: Partial<RenderConfig> = {},
): Promise<string> {
  let template = templateCache.get(view);
  if (template === undefined) {
    const source = await Deno.readTextFile(
      path.join(SNIPPETS_DIR, view, view + TEMPLATE_EXT),
    );
    template = hb.compile(source);
    if (Deno.env.get("ENV") !== "dev") templateCache.set(view, template);
  }

  const config = merge({}, DEFAULT_RENDER_CONFIG, customConfig) as RenderConfig;

  const classes = config.cssMode === "tw"
    ? TW_THEMES[config.twTheme]
    : BEM_CLASSES;

  context["class"] = classes;

  const ctx = config.expressions !== "raw"
    ? await parseTextFields(context, { mode: config.expressions, classes })
    : context;

  return pretty(template(ctx));
}
