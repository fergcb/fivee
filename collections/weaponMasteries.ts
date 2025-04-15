import { collection } from "$collections/_collection.ts";
import { BaseDocument, Source } from "$collections/_common.ts";
import { manyResolver, oneResolver } from "$collections/_resolvers.ts";
import { entries } from "$data/weaponMasteries/entries.ts";

export const ID = "weaponMasteries";

/*
 * TypeScript Types
 */

export interface WeaponMastery extends BaseDocument {
  desc: string;
  source: Source;
}

/**
 * Collection Definition
 */

export default collection<WeaponMastery>({
  id: ID,
  entries,
  typeDefs: `#graphql
    type WeaponMastery {
      id: String!
      name: String!
      desc: String!
      source: Source!
    }

    extend type Query {
      weaponMasteries: [WeaponMastery]
      weaponMastery(id: String!): WeaponMastery
    }
  `,
  resolvers: {
    Query: {
      weaponMastery: oneResolver<WeaponMastery>(ID),
      weaponMasteries: manyResolver<WeaponMastery>(ID),
    },
  },
});
