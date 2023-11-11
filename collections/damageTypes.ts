import { ResolverContext } from "$graphql/context.ts";
import { collection } from "$collections/_collection.ts";
import { BaseDocument } from "$collections/_common.ts";

export const ID = "damageTypes";

/*
 * TypeScript Types
 */

export interface DamageType extends BaseDocument {
  name: string;
  desc: string;
}

/*
 * GraphQL TypeDefs
 */

export const typeDefs = `#graphql
  type DamageType {
    id: String!
    name: String!
    desc: String!
  }

  extend type Query {
    damageTypes: [DamageType]
    damageType(id: String!): DamageType
  }
`;

/*
 * GraphQL Resolvers
 */

interface DamageTypeArgs {
  id: string;
}

export async function oneResolver(
  _parent: unknown,
  { id }: DamageTypeArgs,
  { db }: ResolverContext,
): Promise<DamageType> {
  return await db.get(ID, id);
}

export async function manyResolver(
  _parent: unknown,
  _args: never,
  { db }: ResolverContext,
): Promise<DamageType[]> {
  return await db.list(ID);
}

/*
 * Data
 */

export default collection<DamageType>(ID, [
  {
    id: "psychic",
    name: "Psychic",
    desc: "Mental abilities such as a psionic blast deal psychic damage.",
  },
  {
    id: "thunder",
    name: "Thunder",
    desc:
      "A concussive burst of sound, such as the effect of the thunderwave spell, deals thunder damage.",
  },
  {
    id: "necrotic",
    name: "Necrotic",
    desc:
      "Necrotic damage, dealt by certain undead and a spell such as chill touch, withers matter and even the soul.",
  },
  {
    id: "bludgeoning",
    name: "Bludgeoning",
    desc:
      "Blunt force attacks, falling, constriction, and the like deal bludgeoning damage.",
  },
  {
    id: "radiant",
    name: "Radiant",
    desc:
      "Radiant damage, dealt by a cleric's flame strike spell or an angel's smiting weapon, sears the flesh like fire and overloads the spirit with power.",
  },
  {
    id: "cold",
    name: "Cold",
    desc:
      "The infernal chill radiating from an ice devil's spear and the frigid blast of a white dragon's breath deal cold damage.",
  },
  {
    id: "force",
    name: "Force",
    desc:
      "Force is pure magical energy focused into a damaging form. Most effects that deal force damage are spells, including magic missile and spiritual weapon.",
  },
  {
    id: "acid",
    name: "Acid",
    desc:
      "The corrosive spray of a black dragon's breath and the dissolving enzymes secreted by a black pudding deal acid damage.",
  },
  {
    id: "piercing",
    name: "Piercing",
    desc:
      "Puncturing and impaling attacks, including spears and monsters' bites, deal piercing damage.",
  },
  {
    id: "lightning",
    name: "Lightning",
    desc:
      "A lightning bolt spell and a blue dragon's breath deal lightning damage.",
  },
  {
    id: "slashing",
    name: "Slashing",
    desc: "Swords, axes, and monsters' claws deal slashing damage.",
  },
  {
    id: "poison",
    name: "Poison",
    desc:
      "Venomous stings and the toxic gas of a green dragon's breath deal poison damage.",
  },
  {
    id: "fire",
    name: "Fire",
    desc:
      "Red dragons breathe fire, and many spells conjure flames to deal fire damage.",
  },
]);
