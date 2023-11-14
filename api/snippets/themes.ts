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

export const THEME_NAMES = ["none", "default"] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

export function isValidTheme(theme: unknown): theme is ThemeName {
  return (
    theme !== undefined &&
    typeof theme === "string" &&
    THEME_NAMES.includes(theme as ThemeName)
  );
}

export const TW_THEMES: Record<ThemeName, ClassList> = {
  none: Object.fromEntries(CLASS_NAMES.map((c) => [c, ""])) as ClassList,
  default: {
    snippet: "font-serif",
    paragraph: "[&+p]:indent-4",
    list: "pl-4 my-2 space-y-1",
    "list-ordered": "list-decimal",
    "list-unordered": "list-disc",
    dice: "font-bold",
    ref: "italic text-[#9c1910]",
    spell: `text-black rounded drop-shadow p-4 max-w-[calc(60ch+2rem)]`,
    spell__name:
      `text-xl font-['Gill_Sans',Arial,sans-serif] font-semibold text-[#9c1910]`,
    "spell__level-school-ritual": "italic text-stone-700",
    spell__metadata: "mt-3",
    spell__metadata__key: "inline font-bold after:content-[':']",
    spell__metadata__value: "inline m-0",
  },
};
