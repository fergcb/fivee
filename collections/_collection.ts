import { Entry } from "$db/resolver.ts";
import { Document } from "$collections/_index.ts";
import { ResolverContext } from "$graphql/context.ts";
import { ApolloServerOptions } from "npm:@apollo/server@^4.9";

export class Collection<Doc extends Document> {
  constructor(
    public readonly id: string,
    public readonly typeDefs: ApolloServerOptions<ResolverContext>["typeDefs"],
    public readonly resolvers: ApolloServerOptions<
      ResolverContext
    >["resolvers"],
    public readonly entries: Entry<Doc>[],
  ) {}
}

interface CollectionOptions<T extends Document> {
  id: string;
  typeDefs: ApolloServerOptions<ResolverContext>["typeDefs"];
  resolvers: ApolloServerOptions<ResolverContext>["resolvers"];
  entries: Entry<T>[];
}

export function collection<T extends Document>({
  id,
  entries,
  typeDefs,
  resolvers,
}: CollectionOptions<T>) {
  const ids = new Set<string>();

  for (const { id: entryId } of entries) {
    if (ids.has(entryId)) {
      throw new Error(`Duplicate id '${entryId}' in collection '${id}'.`);
    }
    ids.add(id);
  }

  return new Collection<T>(id, typeDefs, resolvers, entries);
}
