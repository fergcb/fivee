import indent from "npm:indent-string";

import {
  CastingTime,
  SpellDuration,
  SpellMaterials,
  SpellRange,
} from "$collections/spells/collection.ts";
import rawSpells from "./spells-phb.json" assert { type: "json" };
import apiSpells from "./5esrdapi-spells.json" assert { type: "json" };
import { phbSpells } from "$collections/spells/phbSpells.ts";

export type DamageProgression =
  | {
      kind: "cantrip";
      damageAtCharacterLevel: [number, string][];
    }
  | {
      kind: "levelled";
      damageAtSlotLevel: [number, string][];
    };

type SpellAttack =
  | {
      kind: "ranged" | "melee";
      damage?: {
        damageType: string;
        damageProgression: DamageProgression;
      };
    }
  | {
      kind: "savingThrow";
      saveType: string;
      effectOnSave: "noEffect" | "halfDamage" | "special";
      damage?: {
        damageType?: string;
        damageProgression: DamageProgression;
      };
    }
  | {
      kind: "healing";
      healingAtSlotLevel: [number, string][];
    };

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  desc: string;
  atHigherLevels?: string;
  range: SpellRange;
  components: ("V" | "S" | "M")[];
  materials?: SpellMaterials;
  ritual: boolean;
  durations: SpellDuration[];
  castingTimes: CastingTime[];
  attack?: SpellAttack;
  source: {
    book: string;
    page: number;
  };
}

const attackTemplate = (attack: SpellAttack) =>
  `
attack: {
  kind: "${attack.kind}",
  ${
    attack.kind === "healing"
      ? `
  healingAtSlotLevel: {
    ${attack.healingAtSlotLevel.map(([lvl, dice]) => `${lvl}: dice("${dice}")`)}
  },`
      : ""
  }
  ${
    (attack as any).damage &&
    ["ranged", "melee", "savingThrow"].includes(attack.kind)
      ? `
  damage: {
    damageType: ref("damageTypes", "${(attack as any).damage.damageType}"),
    damageProgression: {
      kind: "${(attack as any).damage.damageProgression.kind}",
      ${
        (attack as any).damage.damageProgression.kind === "cantrip"
          ? `
      damageAtCharacterLevel: {
        ${(attack as any).damage.damageProgression.damageAtCharacterLevel.map(
          ([lvl, dice]: [number, string]) => `${lvl}: dice("${dice}")`
        )}
      }`
          : `
      damageAtSlotLevel: {
        ${(attack as any).damage.damageProgression.damageAtSlotLevel.map(
          ([lvl, dice]: [number, string]) => `${lvl}: dice("${dice}")`
        )}
      }`
      }
    }
  },`
      : ""
  }
  ${
    attack.kind === "savingThrow"
      ? `
  saveType: ref("abilityScores", "${attack.saveType}"),
  effectOnSave: "${attack.effectOnSave}"`
      : ""
  }
},
`.replaceAll(/^\s*[\r\n]/gm, "");

// prettier-ignore
const template = (data: Spell) => `
  {
    id: "${data.id}",
    name: "${data.name}",
    level: ${data.level},
    school: ref("magicSchools", "${data.school}"),
    desc: md\`
      ${data.desc}
    \`,
    ${data.atHigherLevels ? `
    atHigherLevels: md\`
      ${data.atHigherLevels}
    \`,` : ''}
    range: ${JSON.stringify(data.range, null, 2)},
    components: [${data.components.map(c => `"${c}"`).join(", ")}],
    ${data.materials ? `
    materials: ${JSON.stringify(data.materials)},
    ` : ''}
    ritual: ${data.ritual},
    durations: ${JSON.stringify(data.durations, null, 2)},
    castingTimes: ${JSON.stringify(data.castingTimes, null, 2)},
    ${data.attack ? attackTemplate(data.attack) : ''}
    source: source("${data.source.book}", ${data.source.page}),
},
`.replaceAll(/^\s*[\r\n]/gm, '')
 .replaceAll("<p>", "\n\n");

function id(name: string): string {
  return name
    .toLowerCase()
    .replaceAll(/\W+/g, " ")
    .split(/\s+/g)
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join("");
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

function formatRange(
  range: ArrayElement<(typeof rawSpells)["spell"]>["range"]
): SpellRange {
  if (range.type === "special") return { kind: "special" };
  if (
    ["radius", "sphere", "cone", "line", "hemisphere", "cube"].includes(
      range.type
    )
  ) {
    return {
      kind: "self",
      shape: {
        // @ts-ignore: type funk
        kind: range.type,
        size: {
          // @ts-ignore: type funk
          unit: range.distance?.type,
          // @ts-ignore: type funk
          distance: range.distance?.amount,
        },
      },
    };
  }
  if (range.type === "point") {
    if (range.distance?.type === "sight") return { kind: "sight" };
    if (range.distance?.type === "unlimited") return { kind: "unlimited" };
    if (range.distance?.type === "self") return { kind: "self" };
    if (range.distance?.type === "touch") return { kind: "touch" };
    return {
      kind: "point",
      // @ts-ignore: type funk
      unit: range.distance?.type,
      // @ts-ignore: type funk
      distance: range.distance?.amount,
    };
  }
  throw new Error(`Failed to format range:\n${JSON.stringify(range, null, 2)}`);
}

function formatConsumed(
  consumed: boolean | undefined | string
): SpellMaterials["consumed"] {
  return typeof consumed === "boolean"
    ? consumed
      ? "yes"
      : "no"
    : consumed === "undefined"
    ? "no"
    : "optional";
}

function formatMaterials(
  m: ArrayElement<(typeof rawSpells)["spell"]>["components"]["m"]
): SpellMaterials | undefined {
  if (m === undefined) return undefined;

  if (typeof m === "string") {
    return {
      desc: m,
      consumed: "no",
    };
  }

  if (m.cost !== undefined) {
    return {
      desc: m.text,
      consumed: formatConsumed(m.consume),
      cost: {
        amount: m.cost / 100,
        currency: "gp",
      },
    };
  }

  return {
    desc: m.text,
    consumed: formatConsumed(m.consume),
  };
}

function formatUntil(
  ends: string[]
): ("dispelled" | "long rest" | "short rest" | "triggered")[] {
  return ends.map((e) => {
    switch (e) {
      case "dispel":
        return "dispelled";
      case "trigger":
        return "triggered";
      default:
        throw new Error(
          `Expected end to be either 'dispel' or 'trigger', got ${e}`
        );
    }
  });
}

function formatDurations(
  name: string,
  durations: ArrayElement<(typeof rawSpells)["spell"]>["duration"]
): SpellDuration[] {
  return durations.map((d): SpellDuration => {
    if (d.type === "instant") return { kind: "instantaneous" };
    if (d.type === "special") return { kind: "special" };
    if (d.type === "permanent") {
      // @ts-ignore: we know d.ends exists on "permanent" durations
      if (d.ends) {
        return {
          kind: "permanent",
          // @ts-ignore: see above
          until: formatUntil(d.ends),
        };
      }

      return { kind: "permanent" };
    }
    if (d.type === "timed") {
      const t: any = d;
      return {
        kind: "time",
        amount: t.duration.amount,
        // @ts-ignore: trust me bro
        unit: formatUnit(t.duration.type),
        concentration: t.concentration ? true : false,
      };
    }

    throw new Error(`Failed to format durations for spell ${name}`);
  });
}

function formatTimes(
  times: ArrayElement<(typeof rawSpells)["spell"]>["time"]
): CastingTime[] {
  return times.map((t): CastingTime => {
    return {
      unit: formatUnit(t.unit) as CastingTime["unit"],
      amount: t.number,
      condition: (t as any).condition,
    };
  });
}

function formatUnit(unit: string): string {
  if (["minute", "hour", "day", "week", "round"].includes(unit))
    return unit + "s";
  if (unit === "bonus") return "bonus action";
  return unit;
}

function formatDamageProgression(
  data: ArrayElement<(typeof apiSpells)["data"]["spells"]>
): DamageProgression {
  if (data.damage?.damage_at_character_level) {
    return {
      kind: "cantrip",
      damageAtCharacterLevel: data.damage.damage_at_character_level.map(
        ({ damage, level }) => [level, damage]
      ),
    };
  } else if (data.damage?.damage_at_slot_level) {
    return {
      kind: "levelled",
      damageAtSlotLevel: data.damage.damage_at_slot_level.map(
        ({ damage, level }) => [level, damage]
      ),
    };
  }

  throw new Error(
    "Failed to format damage progression:\n" + JSON.stringify(data, null, 2)
  );
}

function formatAttack(
  data?: ArrayElement<(typeof apiSpells)["data"]["spells"]>
): SpellAttack | undefined {
  if (data === undefined) return undefined;

  if (data.attack_type !== null) {
    return {
      kind: data.attack_type.toLowerCase() as "ranged" | "melee",
      damage:
        data.damage === null
          ? undefined
          : {
              damageType: data.damage.damage_type.index,
              damageProgression: formatDamageProgression(data),
            },
    };
  }

  if (data.dc !== null) {
    return {
      kind: "savingThrow",
      saveType: data.dc.type.index,
      effectOnSave: (
        { NONE: "noEffect", HALF: "halfDamage", OTHER: "special" } as const
      )[data.dc.success]!,
      damage:
        data.damage === null
          ? undefined
          : {
              damageType: data.damage.damage_type?.index,
              damageProgression: formatDamageProgression(data),
            },
    };
  }

  if (data.heal_at_slot_level) {
    return {
      kind: "healing",
      healingAtSlotLevel: data.heal_at_slot_level.map(({ level, healing }) => [
        level,
        healing,
      ]),
    };
  }

  return undefined;
}

const spellData = rawSpells.spell.map((spell) => {
  return {
    id: id(spell.name),
    name: spell.name,
    level: spell.level,
    school: (
      {
        A: "abjuration",
        T: "transmutation",
        E: "enchantment",
        N: "necromancy",
        D: "divination",
        C: "conjuration",
        V: "evocation",
        I: "illusion",
      } as const
    )[spell.school]!,
    desc: spell.entries
      .map((p) => String(p).replace(/(?![^\n]{1,94}$)([^\n]{1,94})\s/g, "$1\n"))
      .map((p) => indent(p, 6))
      .join("<p>")
      .trimStart(),
    atHigherLevels: spell.entriesHigherLevel
      ?.flatMap((e) =>
        e.entries.map(
          (p, i) =>
            (i === 0 ? "      " : "") +
            String(p).replace(/(?![^\n]{1,94}$)([^\n]{1,94})\s/g, "$1\n")
        )
      )
      ?.join("<p>"),
    range: formatRange(spell.range),
    components: Object.entries(spell.components).flatMap(([k, v]) =>
      v ? [k.toUpperCase() as "V" | "S" | "M"] : []
    ),
    materials: formatMaterials(spell.components.m),
    ritual: spell.meta?.ritual ? true : false,
    durations: formatDurations(spell.name, spell.duration),
    castingTimes: formatTimes(spell.time),
    source: {
      book: spell.source,
      page: spell.page,
    },
    attack: formatAttack(
      apiSpells.data.spells.find((s) => id(s.index) === id(spell.name))
    ),
  };
});

const spells = spellData.map((spell) => {
  return template(spell);
});

const attacks = apiSpells.data.spells
  .filter((attack) => {
    const spell = phbSpells.find((spell) => spell.name === attack.name);
    return spell && spell.attack === undefined;
  })
  .toSorted((a, b) => (a.name > b.name ? 1 : -1))
  .flatMap((spell) => {
    const attack = formatAttack(spell);
    return attack === undefined
      ? []
      : [`name: "${spell.name}",\n` + attackTemplate(attack)];
  });

console.log(`
import { ref, dice } from "$helpers";
import { SpellAttack } from "$collections/spells/collection.ts";
import { Entry } from "$db/resolver.ts";

const attacks: Entry<{name: string, attack: SpellAttack}>[] = [
  ${attacks.map((a) => `{${a}},`).join("\n")}
];
`);

// console.log(spells.join("\n"));
