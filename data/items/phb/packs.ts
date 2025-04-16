import { PackItem } from "$collections/items/collection.ts";
import { Entry } from "$db/resolver.ts";
import { cost, ref, source } from "$helpers";

type PackData =
  & Pick<Entry<PackItem>, "id" | "name" | "cost" | "weight">
  & { contents: { item: string; quantity?: number }[] };

function pack({ contents, ...data }: PackData): Entry<PackItem> {
  return {
    kind: "pack",
    contents: contents.map(({ item, quantity }) => ({
      item: ref("items", item),
      quantity: quantity ?? 1,
    })),
    tags: ["Equipment Pack"],
    source: source("PHB2024", 223),
    ...data,
  };
}

export const packs: Entry<PackItem>[] = [
  pack({
    id: "burglarsPack",
    name: "Burglar's Pack",
    cost: cost("16 gp"),
    weight: 42,
    contents: [
      { item: "backpack" },
      { item: "ballBearings" },
      { item: "bell" },
      { item: "candle" },
      { item: "crowbar" },
      { item: "lanternHooded" },
      { item: "oil", quantity: 7 },
      { item: "rations", quantity: 5 },
      { item: "rope" },
      { item: "tinderbox" },
      { item: "waterskin" },
    ],
  }),
  pack({
    id: "diplomatsPack",
    name: "Diplomat's Pack",
    cost: cost("39 gp"),
    weight: 39,
    contents: [
      { item: "chest" },
      { item: "clothesFine" },
      { item: "ink" },
      { item: "inkPen", quantity: 5 },
      { item: "lamp" },
      { item: "caseMapOrScroll", quantity: 2 },
      { item: "oil", quantity: 4 },
      { item: "paper", quantity: 5 },
      { item: "parchment", quantity: 5 },
      { item: "perfume" },
      { item: "waterskin" },
    ],
  }),
  pack({
    id: "dungeoneersPack",
    name: "Dungeoneer's Pack",
    cost: cost("12 gp"),
    weight: 55,
    contents: [
      { item: "backpack" },
      { item: "caltrops" },
      { item: "crowbar" },
      { item: "oil", quantity: 2 },
      { item: "rations", quantity: 10 },
      { item: "rope" },
      { item: "tinderbox" },
      { item: "torch", quantity: 10 },
      { item: "waterskin" },
    ],
  }),
  pack({
    id: "entertainersPack",
    name: "Entertainer's Pack",
    cost: cost("40 gp"),
    weight: 58.5,
    contents: [
      { item: "backpack" },
      { item: "bedroll" },
      { item: "bell" },
      { item: "lanternBullseye" },
      { item: "costume", quantity: 3 },
      { item: "mirror" },
      { item: "oil", quantity: 8 },
      { item: "rations", quantity: 9 },
      { item: "tinderbox" },
      { item: "waterskin" },
    ],
  }),
  pack({
    id: "explorersPack",
    name: "explorer's Pack",
    cost: cost("10 gp"),
    weight: 55,
    contents: [
      { item: "backpack" },
      { item: "bedroll" },
      { item: "oil", quantity: 2 },
      { item: "rations", quantity: 10 },
      { item: "rope" },
      { item: "tinderbox" },
      { item: "torch", quantity: 10 },
      { item: "waterskin" },
    ],
  }),
  pack({
    id: "priestsPack",
    name: "Priest's Pack",
    cost: cost("33 gp"),
    weight: 29,
    contents: [
      { item: "backpack" },
      { item: "blanket" },
      { item: "holyWater" },
      { item: "lamp" },
      { item: "rations", quantity: 7 },
      { item: "robe" },
      { item: "tinderbox" },
    ],
  }),
  pack({
    id: "scholarsPack",
    name: "Scholar's Pack",
    cost: cost("40 gp"),
    weight: 22,
    contents: [
      { item: "backpack" },
      { item: "book" },
      { item: "ink" },
      { item: "inkPen" },
      { item: "lamp" },
      { item: "oil", quantity: 10 },
      { item: "parchment", quantity: 10 },
      { item: "tinderbox" },
    ],
  }),
];
