import type { AbilityScore } from "$collections/abilityScores.ts";
import type { Skill } from "$collections/skills.ts";
import type { SourceBook } from "$collections/sourceBooks.ts";

export type Document = AbilityScore | Skill | SourceBook;

export { AbilityScore, Skill, SourceBook };
