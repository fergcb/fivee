import {
  default as abilityScores,
  ID as abilityScoresID,
} from "$collections/abilityScores.ts";

import {
  default as damageTypes,
  ID as damageTypesID,
} from "$collections/damageTypes.ts";

import {
  default as magicSchools,
  ID as magicSchoolsID,
} from "$collections/magicSchools.ts";

import { default as skills, ID as skillsID } from "$collections/skills.ts";

import {
  default as sourceBooks,
  ID as sourceBooksID,
} from "$collections/sourceBooks.ts";

import { default as spells, ID as spellsID } from "$collections/spells.ts";

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
