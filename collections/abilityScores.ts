import { ResolverContext } from "$graphql/context.ts";
import { collection } from "$collections/_collection.ts";
import { BaseDocument, Source } from "$collections/_common.ts";
import { Skill } from "$collections/skills.ts";
import { md, query, source } from "$helpers";

export const ID = "abilityScores";

/*
 * TypeScript Types
 */

export interface AbilityScore extends BaseDocument {
  name: string;
  shortName: string;
  desc: string;
  skills: Skill[];
  source: Source;
}

/*
 * GraphQL TypeDefs
 */

export const typeDefs = `#graphql
  type AbilityScore {
    id: String!
    name: String!
    shortName: String!
    desc: String!
    skills: [Skill]!
    source: Source!
  }

  extend type Query {
    abilityScores: [AbilityScore]
    abilityScore(id: String!): AbilityScore
  }
`;

/*
 * GraphQL Resolvers
 */

interface AbilityScoreArgs {
  id: string;
}

export async function oneResolver(
  _parent: unknown,
  { id }: AbilityScoreArgs,
  { db }: ResolverContext
): Promise<AbilityScore> {
  return await db.get(ID, id);
}

export async function manyResolver(
  _parent: unknown,
  _args: never,
  { db }: ResolverContext
): Promise<AbilityScore[]> {
  return await db.list(ID);
}

/*
 * Data
 */

export default collection<AbilityScore>(ID, [
  {
    id: "cha",
    name: "Charisma",
    shortName: "CHA",
    desc: md`
      Charisma measures your ability to interact effectively with others. It includes such factors
      as confidence and eloquence, and it can represent a charming or commanding personality.

      A Charisma check might arise when you try to influence or entertain others, when you try to
      make an impression or tell a convincing lie, or when you are navigating a tricky social
      situation. The Deception, Intimidation, Performance, and Persuasion skills reflect aptitude
      in certain kinds of Charisma checks.
    `,
    skills: query<Skill>("skills").where("baseAbility", "is", "charisma").all(),
    source: source("PHB", 178),
  },
  {
    id: "con",
    name: "Constitution",
    shortName: "CON",
    desc: md`
      Constitution measures health, stamina, and vital force.

      Constitution checks are uncommon, and no skills apply to Constitution checks, because the
      endurance this ability represents is largely passive rather than involving a specific effort
      on the part of a character or monster.
    `,
    skills: query<Skill>("skills")
      .where("baseAbility", "is", "constitution")
      .all(),
    source: source("PHB", 177),
  },
  {
    id: "dex",
    name: "Dexterity",
    shortName: "DEX",
    desc: md`
      Dexterity measures agility, reflexes, and balance.

      A Dexterity check can model any attempt to move nimbly, quickly, or quietly, or to keep from
      falling on tricky footing. The Acrobatics, Sleight of Hand, and Stealth skills reflect
      aptitude in certain kinds of Dexterity checks.
    `,
    skills: query<Skill>("skills")
      .where("baseAbility", "is", "dexterity")
      .all(),
    source: source("PHB", 176),
  },
  {
    id: "int",
    name: "Intelligence",
    shortName: "INT",
    desc: md`
      Intelligence measures mental acuity, accuracy of recall, and the ability to reason.

      An Intelligence check comes into play when you need to draw on logic, education, memory, or
      deductive reasoning. The Arcana, History, Investigation, Nature, and Religion skills reflect
      aptitude in certain kinds of Intelligence checks.
    `,
    skills: query<Skill>("skills")
      .where("baseAbility", "is", "intelligence")
      .all(),
    source: source("PHB", 177),
  },
  {
    id: "str",
    name: "Strength",
    shortName: "STR",
    desc: md`
      Strength measures bodily power, athletic training, and the extent to which you can exert raw
      physical force.

      A Strength check can model any attempt to lift, push, pull, or break something, to force your
      body through a space, or to otherwise apply brute force to a situation. The Athletics skill
      reflects aptitude in certain kinds of Strength checks.
    `,
    skills: query<Skill>("skills").where("baseAbility", "is", "strength").all(),
    source: source("PHB", 175),
  },
  {
    id: "wis",
    name: "Wisdom",
    shortName: "WIS",
    desc: md`
      Wisdom reflects how attuned you are to the world around you and represents perceptiveness and
      intuition.

      A Wisdom check might reflect an effort to read body language, understand someone's feelings,
      notice things about the environment, or care for an injured person. The Animal Handling,
      Insight, Medicine, Perception, and Survival skills reflect aptitude in certain kinds of Wisdom
      checks.
    `,
    skills: query<Skill>("skills").where("baseAbility", "is", "wisdom").all(),
    source: source("PHB", 178),
  },
]);
