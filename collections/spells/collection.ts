import { collection } from "$collections/_collection.ts";
import { BaseDocument, Cost, Range, Source } from "$collections/_common.ts";
import { MagicSchool } from "$collections/magicSchools.ts";
import { AbilityScore } from "$collections/abilityScores.ts";
import { DamageType } from "$collections/damageTypes.ts";
import { phbSpells } from "$collections/spells/phbSpells.ts";
import { manyResolver, oneResolver } from "$collections/_resolvers.ts";

export const ID = "spells";

/*
 * TypeScript Types
 */

export type SpellRange =
  | (Range & { kind: "point" })
  | {
    kind: "self";
    shape?: {
      kind: "sphere" | "radius" | "cone" | "line" | "hemisphere" | "cube";
      size: Range;
    };
  }
  | { kind: "touch" }
  | { kind: "special" }
  | { kind: "sight" }
  | { kind: "unlimited" };

export interface SpellMaterials {
  desc: string;
  cost?: Cost;
  consumed: "yes" | "no" | "optional";
}

export type SpellDuration =
  | { kind: "instantaneous" }
  | { kind: "special" }
  | (
    & (
      | { kind: "permanent" }
      | {
        kind: "time";
        amount: number;
        unit: "round" | "minute" | "hour" | "day" | "week";
        concentration: boolean;
      }
    )
    & { until?: ("dispelled" | "long rest" | "short rest" | "triggered")[] }
  );

export interface CastingTime {
  amount: number;
  unit:
    | "action"
    | "bonus action"
    | "reaction"
    | "minute"
    | "hour"
    | "day"
    | "week";
  condition?: string;
}

export type DamageProgression =
  | {
    kind: "cantrip";
    damageAtCharacterLevel: { [key: number]: string };
  }
  | {
    kind: "levelled";
    damageAtSlotLevel: { [key: number]: string };
  };

export type SpellAttack =
  | {
    kind: "ranged" | "melee";
    damage?: {
      damageType?: DamageType;
      damageProgression: DamageProgression;
    };
  }
  | {
    kind: "savingThrow";
    saveType: AbilityScore;
    effectOnSave: "noEffect" | "halfDamage" | "special";
    damage?: {
      damageType?: DamageType;
      damageProgression: DamageProgression;
    };
  }
  | {
    kind: "healing";
    healingAtSlotLevel: { [key: number]: string };
  };

export interface Spell extends BaseDocument {
  level: number;
  school: MagicSchool;
  desc: string;
  atHigherLevels?: string;
  range: SpellRange;
  components: ("V" | "S" | "M")[];
  materials?: SpellMaterials;
  ritual: boolean;
  durations: SpellDuration[];
  castingTimes: CastingTime[];
  attack?: SpellAttack;
  source: Source;
}

/*
 * Collection Definition
 */

export default collection<Spell>({
  id: ID,
  typeDefs: Deno.readTextFileSync("./collections/spells/typeDefs.graphql"),
  resolvers: {
    Query: {
      spell: oneResolver<Spell>(ID),
      spells: manyResolver<Spell>(ID),
    },
    ISpellAttack: {
      __resolveType(attack: SpellAttack): string {
        switch (attack.kind) {
          case "ranged":
          case "melee":
            return "MeleeOrRangedSpellAttack";
          case "savingThrow":
            return "SavingThrowSpellAttack";
          case "healing":
            return "HealingSpellAttack";
        }
      },
    },
  },
  entries: phbSpells,
});
