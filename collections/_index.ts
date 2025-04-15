import {
  AbilityScore,
  default as abilityScores,
  ID as abilityScoresID,
} from "$collections/abilityScores.ts";

import {
  DamageType,
  default as damageTypes,
  ID as damageTypesID,
} from "$collections/damageTypes.ts";

import {
  default as items,
  ID as itemsID,
  Item,
} from "$collections/items/collection.ts";

import {
  default as magicSchools,
  ID as magicSchoolsID,
  MagicSchool,
} from "$collections/magicSchools.ts";

import {
  default as skills,
  ID as skillsID,
  Skill,
} from "$collections/skills.ts";

import {
  default as sourceBooks,
  ID as sourceBooksID,
  SourceBook,
} from "$collections/sourceBooks.ts";

import {
  default as spells,
  ID as spellsID,
  Spell,
} from "$collections/spells/collection.ts";

import {
  default as weaponMasteries,
  ID as weaponMasteriesID,
  WeaponMastery,
} from "$collections/weaponMasteries.ts";

export type CollectionID =
  | typeof abilityScoresID
  | typeof damageTypesID
  | typeof itemsID
  | typeof magicSchoolsID
  | typeof skillsID
  | typeof sourceBooksID
  | typeof spellsID
  | typeof weaponMasteriesID;

export const collections = {
  abilityScores,
  damageTypes,
  items,
  magicSchools,
  skills,
  sourceBooks,
  spells,
  weaponMasteries,
};

export type Document =
  | AbilityScore
  | DamageType
  | Item
  | MagicSchool
  | Skill
  | SourceBook
  | Spell
  | WeaponMastery;

export type { AbilityScore, Skill, SourceBook };
