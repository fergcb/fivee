import { collection } from "$collections/_collection.ts";
import { BaseDocument, Source } from "$collections/_common.ts";
import { entries } from "$data/magicSchools/entries.ts";
import { manyResolver, oneResolver } from "$collections/_resolvers.ts";

export const ID = "magicSchools";

/*
 * TypeScript Types
 */

export interface MagicSchool extends BaseDocument {
  desc: string;
  source: Source;
}

/*
 * Data
 */

export default collection<MagicSchool>({
  id: ID,
  entries,
  typeDefs: `#graphql
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
  `,
  resolvers: {
    Query: {
      magicSchool: oneResolver<MagicSchool>(ID),
      magicSchools: manyResolver<MagicSchool>(ID),
    },
  },
});
