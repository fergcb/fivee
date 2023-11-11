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
 * GraphQL TypeDefs
 */

export const typeDefs = `#graphql
  type SourceBook {
    id: String!
    name: String!
  }

  extend type Query {
    sourceBooks: [SourceBook]
    sourceBook(id: String!): SourceBook
  }
`;

/*
 * GraphQL Resolvers
 */

interface SourceBookArgs {
  id: string;
}

export async function oneResolver(
  _parent: unknown,
  { id }: SourceBookArgs,
  { db }: ResolverContext,
): Promise<SourceBook> {
  return await db.get(ID, id);
}

export async function manyResolver(
  _parent: unknown,
  _args: never,
  { db }: ResolverContext,
): Promise<SourceBook[]> {
  return await db.list(ID);
}

/*
 * Data
 */

export default collection<SourceBook>(ID, [
  {
    id: "PHB",
    name: "Player's Handbook",
  },
  {
    id: "SRD",
    name: "System Reference Document 5.1",
  },
]);
