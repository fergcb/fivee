import { armor } from "./armor.ts";
import { gear } from "$data/items/phb/gear.ts";
import { weapons } from "./weapons.ts";
import { packs } from "$data/items/phb/packs.ts";

export const phbEntries = [
  ...weapons,
  ...armor,
  ...gear,
  ...packs,
];
