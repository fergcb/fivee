import { ResolverContext } from "$graphql/context.ts";
import { collection } from "$collections/_collection.ts";
import { BaseDocument } from "$collections/_common.ts";

export const ID = "sourceBooks";

/*
 * TypeScript Types
 */

export interface SourceBook extends BaseDocument {
  name: string;
}

/*
 * Resolver Parameter Types
 */

interface SourceBookArgs {
  id: string;
}

/*
 * Data
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
      async sourceBook(
        _parent: unknown,
        { id }: SourceBookArgs,
        { db }: ResolverContext,
      ): Promise<SourceBook | null> {
        return await db.get(ID, id);
      },
      async sourceBooks(
        _parent: unknown,
        _args: never,
        { db }: ResolverContext,
      ): Promise<SourceBook[]> {
        return await db.list(ID);
      },
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
