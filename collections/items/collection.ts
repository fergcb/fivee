import { collection } from "$collections/_collection.ts";
import { BaseDocument, Cost, Damage, Source } from "$collections/_common.ts";
import { entries } from "$data/items/entries.ts";
import { manyResolver, oneResolver } from "$collections/_resolvers.ts";
import { AbilityScore } from "$collections/abilityScores.ts";
import { WeaponMastery } from "$collections/weaponMasteries.ts";

export const ID = "items";

/*
 * TypeScript Types
 */

export type WeaponCategory = "simple" | "martial";
export type WeaponRange =
  | { kind: "melee"; normal: number }
  | { kind: "ranged"; normal: number; long: number };

export type WeaponProperty =
  | { kind: "light" }
  | { kind: "heavy" }
  | { kind: "finesse" }
  | { kind: "twoHanded"; unlessMounted: boolean }
  | { kind: "thrown"; thrownRange: { normal: number; long: number } }
  | { kind: "reach" }
  | { kind: "versatile"; twoHandedDamage: string }
  | { kind: "ammunition"; ammunition: string }
  | { kind: "loading" }
  | { kind: "special" };

export interface WeaponItem {
  kind: "weapon";
  category: WeaponCategory;
  range: WeaponRange;
  properties: WeaponProperty[];
  damage: Damage;
  mastery: WeaponMastery;
}

export type ArmorCategory = "light" | "medium" | "heavy" | "shield";

export type ArmorArmorClass =
  | { kind: "set"; base: number }
  | { kind: "compute"; base: number; modifier: AbilityScore }
  | { kind: "add"; bonus: number };

export interface ArmorItem {
  kind: "armor";
  category: ArmorCategory;
  armorClass: ArmorArmorClass;
  strengthRequirement: number | null;
  stealthDisadvantage: boolean;
}

export interface MiscItem {
  kind: "misc";
}

export type ItemVariant =
  | WeaponItem
  | ArmorItem
  | MiscItem;

export interface BaseItem extends BaseDocument {
  cost: Cost;
  weight: number;
  tags: string[];
  source: Source;
}

export type Item = BaseItem & ItemVariant;

/*
 * Collection Definition
 */

export default collection<Item>({
  id: ID,
  entries,
  typeDefs: Deno.readTextFileSync("./collections/items/typeDefs.graphql"),
  resolvers: {
    Query: {
      item: oneResolver<Item>(ID),
      items: manyResolver<Item>(ID),
    },
    Item: {
      __resolveType(item: Item): string {
        switch (item.kind) {
          case "weapon":
            return "WeaponItem";
          case "armor":
            return "ArmorItem";
          case "misc":
            return "MiscItem";
        }
      },
    },
    WeaponRange: {
      __resolveType(range: WeaponRange): string {
        switch (range.kind) {
          case "melee":
            return "WeaponRangeMelee";
          case "ranged":
            return "WeaponRangeRanged";
        }
      },
    },
    WeaponProperty: {
      __resolveType(property: WeaponProperty): string {
        switch (property.kind) {
          case "ammunition":
            return "WeaponPropertyAmmunition";
          case "thrown":
            return "WeaponPropertyThrown";
          case "twoHanded":
            return "WeaponPropertyTwoHanded";
          case "versatile":
            return "WeaponPropertyVersatile";
          default:
            return "WeaponPropertyOther";
        }
      },
    },
    ArmorArmorClass: {
      __resolveType(ac: ArmorArmorClass): string {
        switch (ac.kind) {
          case "set":
            return "ArmorArmorClassSet";
          case "compute":
            return "ArmorArmorClassCompute";
          case "add":
            return "ArmorArmorClassAdd";
        }
      },
    },
  },
});
