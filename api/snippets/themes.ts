const CLASS_NAMES = [
  "snippet",
  // Markdown Elements
  "paragraph",
  "list",
  "list-ordered",
  "list-unordered",
  "list__item",
  // Special
  "dice",
  "ref",
  "ref-abilityScores",
  "ref-damageTypes",
  "ref-magicSchools",
  "ref-skills",
  "ref-sourceBooks",
  "ref-spells",
  // Spell Card
  "spell",
  "spell__name",
  "spell__level-school-ritual",
  "spell__level",
  "spell__school",
  "spell__ritual",
  "spell__metadata",
  "spell__metadata__key",
  "spell__metadata__value",
  "spell__casting-time",
  "spell__range",
  "spell__components",
  "spell__materials",
  "spell__duration",
  "spell__description",
  "spell__higher-levels",
] as const;

export type ClassName = (typeof CLASS_NAMES)[number];

export type ClassList = Partial<Record<ClassName, string>>;

export const BEM_CLASSES = Object.fromEntries(
  CLASS_NAMES.map((cn) => [cn, "fivee__" + cn]),
) as ClassList;

export const THEME_NAMES = ["none", "default", "default-dark", "book"] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

export function isValidTheme(theme: unknown): theme is ThemeName {
  return (
    theme !== undefined &&
    typeof theme === "string" &&
    THEME_NAMES.includes(theme as ThemeName)
  );
}

interface BasicThemeVars {
  colorPrimary: string;
  colorText: string;
  colorTextMuted: string;
  colorBg: string;
  fontBody: string;
  fontTitle: string;
}

function createBasicTheme(vars: BasicThemeVars): ClassList {
  return {
    snippet:
      `font-${vars.fontBody} bg-${vars.colorBg} text-${vars.colorText} leading-tight`,
    paragraph: "[&+p]:indent-4",
    list: "pl-4 my-2 space-y-1",
    "list-ordered": "list-decimal",
    "list-unordered": "list-disc",
    dice: "font-bold",
    ref: "italic text-[#9c1910]",
    spell: `p-4 max-w-[calc(60ch+2rem)]`,
    spell__name:
      `text-xl font-${vars.fontTitle} text-${vars.colorPrimary} font-semibold`,
    "spell__level-school-ritual": `italic text-${vars.colorTextMuted}`,
    spell__metadata: "mt-3",
    spell__metadata__key: "inline font-bold after:content-[':']",
    spell__metadata__value: "inline m-0",
  };
}

export const TW_THEMES: Record<ThemeName, ClassList> = {
  none: Object.fromEntries(CLASS_NAMES.map((c) => [c, ""])) as ClassList,
  default: createBasicTheme({
    colorPrimary: "[#9c1910]",
    colorText: "black",
    colorTextMuted: "neutral-700",
    colorBg: "white",
    fontBody: "serif",
    fontTitle: "['Gill_Sans',Arial,sans-serif]",
  }),
  "default-dark": createBasicTheme({
    colorPrimary: "red-400",
    colorText: "stone-400",
    colorTextMuted: "stone-500",
    colorBg: "stone-900",
    fontBody: "serif",
    fontTitle: "['Gill_Sans',Arial,sans-serif]",
  }),
  book: createBasicTheme({
    colorPrimary: "[#58180d]",
    colorText: "black",
    colorTextMuted: "black",
    colorBg:
      "[url('https://homebrewery.naturalcrit.com/assets/parchmentBackground.jpg')]",
    fontBody:
      "['BookInsanity',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif]",
    fontTitle:
      "['Mr_Eaves','BookInsanity',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif]",
  }),
};
