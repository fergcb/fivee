import { collection } from "$collections/_collection.ts";
import { BaseDocument } from "$collections/_common.ts";
import { manyResolver, oneResolver } from "$collections/_resolvers.ts";

export const ID = "sourceBooks";

/*
 * TypeScript Types
 */

// deno-lint-ignore no-empty-interface
export interface SourceBook extends BaseDocument {}

/*
 * Collection Definition
 */

export default collection<SourceBook>({
  id: ID,
  typeDefs: `#graphql
    type SourceBook {
      id: String!
      name: String!
    }

    extend type Query {
      sourceBooks: [SourceBook]
      sourceBook(id: String!): SourceBook
    }
  `,
  resolvers: {
    Query: {
      sourceBook: oneResolver<SourceBook>(ID),
      sourceBooks: manyResolver<SourceBook>(ID),
    },
  },
  entries: [
    {
      id: "PHB",
      name: "Player's Handbook",
    },
    {
      id: "SRD",
      name: "System Reference Document 5.1",
    },
  ],
});
