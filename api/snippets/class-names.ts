const CLASS_NAMES = [
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

type ClassName = (typeof CLASS_NAMES)[number];

type ClassList = Record<ClassName, string>;

export const BEM_CLASSES = Object.fromEntries(
  CLASS_NAMES.map((cn) => [cn, "srd__" + cn])
) as ClassList;

export const TW_CLASSES: ClassList = {
  spell: "bg-stone-100 text-stone-900 rounded drop-shadow",
  spell__name: "text-xl font-bold",
  "spell__level-school-ritual": "italic text-stone-700",
  spell__level: "",
  spell__school: "",
  spell__ritual: "",
  spell__metadata: "",
  spell__metadata__key: "",
  spell__metadata__value: "",
  "spell__casting-time": "",
  spell__range: "",
  spell__components: "",
  spell__materials: "",
  spell__duration: "",
  spell__description: "",
  "spell__higher-levels": "",
};
