import { ResolverContext } from "$graphql/context.ts";
import { collection } from "$collections/_collection.ts";
import { BaseDocument, Source } from "$collections/_common.ts";
import { md, ref } from "$helpers";

export const ID = "magicSchools";

/*
 * TypeScript Types
 */

export interface MagicSchool extends BaseDocument {
  name: string;
  desc: string;
  source: Source;
}

/*
 * GraphQL TypeDefs
 */

export const typeDefs = `#graphql
  type MagicSchool {
    id: String!
    name: String!
    desc: String!
    source: Source!
  }

  extend type Query {
    magicSchools: [MagicSchool]
    magicSchool(id: String!): MagicSchool
  }
`;

/*
 * GraphQL Resolvers
 */

interface MagicSchoolArgs {
  id: string;
}

export async function oneResolver(
  _parent: unknown,
  { id }: MagicSchoolArgs,
  { db }: ResolverContext,
): Promise<MagicSchool> {
  return await db.get(ID, id);
}

export async function manyResolver(
  _parent: unknown,
  _args: never,
  { db }: ResolverContext,
): Promise<MagicSchool[]> {
  return await db.list(ID);
}

/*
 * Data
 */

export default collection<MagicSchool>(ID, [
  {
    id: "abjuration",
    name: "Abjuration",
    desc: md`
      Abjuration spells are protective in nature, though some of them have aggressive uses. They
      create magical barriers, negate harmful effects, harm trespassers, or banish creatures to
      other planes of existence.
    `,
    source: {
      book: ref("sourceBooks", "SRD"),
      page: 103,
    },
  },
  {
    id: "conjuration",
    name: "Conjuration",
    desc: md`
      Conjuration spells involve the transportation of objects and creatures from one location to
      another. Some spells summon creatures or objects to the caster's side, whereas others allow
      the caster to teleport to another location. Some conjurations create objects or effects out of
      nothing.
    `,
    source: {
      book: ref("sourceBooks", "SRD"),
      page: 103,
    },
  },
  {
    id: "divination",
    name: "Divination",
    desc: md`
      Divination spells reveal information, whether in the form of secrets long forgotten, glimpses
      of the future, the locations of hidden things, the truth behind illusions, or visions of
      distant people or places.
    `,
    source: {
      book: ref("sourceBooks", "SRD"),
      page: 103,
    },
  },
  {
    id: "enchantment",
    name: "Enchantment",
    desc: md`
      Enchantment spells affect the minds of others, influencing or controlling their behavior. Such
      spells can make enemies see the caster as a friend, force creatures to take a course of
      action, or even control another creature like a puppet.
    `,
    source: {
      book: ref("sourceBooks", "SRD"),
      page: 103,
    },
  },
  {
    id: "evocation",
    name: "evocation",
    desc: md`
      Evocation spells manipulate magical energy to produce a desired effect. Some call up blasts of
      fire or lightning. Others channel positive energy to heal wounds.
    `,
    source: {
      book: ref("sourceBooks", "SRD"),
      page: 103,
    },
  },
  {
    id: "illusion",
    name: "Illusion",
    desc: md`
      Illusion spells deceive the senses or minds of others. They cause people to see things that
      are not there, to miss things that are there, to hear phantom noises, or to remember things
      that never happened. Some illusions create phantom images that any creature can see, but the
      most insidious illusions plant an image directly in the mind of a creature.
    `,
    source: {
      book: ref("sourceBooks", "SRD"),
      page: 103,
    },
  },
  {
    id: "necromancy",
    name: "Necromancy",
    desc: md`
      Necromancy spells manipulate the energies of life and death. Such spells can grant an extra
      reserve of life force, drain the life energy from another creature, create the undead, or even
      bring the dead back to life.
    `,
    source: {
      book: ref("sourceBooks", "SRD"),
      page: 103,
    },
  },
  {
    id: "transmutation",
    name: "Transmutation",
    desc: md`
      Transmutation spells change the properties of a creature, object, or environment. They might
      turn an enemy into a harmless creature, bolster the strength of an ally, make an object move
      at the caster's command, or enhance a creature's innate healing abilities to rapidly recover
      from injury.
    `,
    source: {
      book: ref("sourceBooks", "SRD"),
      page: 103,
    },
  },
]);
