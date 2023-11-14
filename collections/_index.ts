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

export type CollectionID =
  | typeof abilityScoresID
  | typeof damageTypesID
  | typeof magicSchoolsID
  | typeof skillsID
  | typeof sourceBooksID
  | typeof spellsID;

export const collections = {
  abilityScores,
  damageTypes,
  magicSchools,
  skills,
  sourceBooks,
  spells,
};

export type Document =
  | AbilityScore
  | DamageType
  | MagicSchool
  | Skill
  | SourceBook
  | Spell;

export type { AbilityScore, Skill, SourceBook };
