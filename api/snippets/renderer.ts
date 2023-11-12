import Handlebars from "npm:handlebars";
import { BEM_CLASSES, TW_CLASSES } from "./class-names.ts";
import * as helpers from "./helpers.ts";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
import pretty from "npm:pretty";

const SNIPPETS_DIR = path.dirname(path.fromFileUrl(import.meta.url));
const TEMPLATE_EXT = ".template.hbs";

const hb = Handlebars.create();
const templateCache = new Map<string, HandlebarsTemplateDelegate<unknown>>();

Object.entries(helpers).forEach(([name, fn]) => {
  hb.registerHelper(name, fn);
});

export type RenderConfig = {
  cssMode: "tw" | "bem";
};

const DEFAULT_RENDER_CONFIG: RenderConfig = {
  cssMode: "bem",
};

export async function render(
  view: string,
  // deno-lint-ignore no-explicit-any
  context: Record<string, any>,
  customConfig: Partial<RenderConfig> = {}
): Promise<string> {
  let template = templateCache.get(view);
  if (template === undefined) {
    const source = await Deno.readTextFile(
      path.join(SNIPPETS_DIR, view, view + TEMPLATE_EXT)
    );
    template = hb.compile(source);
    if (Deno.env.get("ENV") !== "dev") templateCache.set(view, template);
  }

  const config = Object.assign({}, DEFAULT_RENDER_CONFIG, customConfig);

  const classFn = config.cssMode === "tw" ? TW_CLASSES : BEM_CLASSES;

  context["class"] = classFn;

  return pretty(template(context));
}
