import { ApolloServer } from "npm:@apollo/server@^4.9";
import { expressMiddleware } from "npm:@apollo/server@^4.9/express4";

import db, { Database } from "$db/database.ts";

import { typeDefs } from "$graphql/typeDefs.ts";
import { resolvers } from "$graphql/resolvers.ts";

export interface ResolverContext {
  db: Database;
}

export async function graphqlMiddleware() {
  const server = new ApolloServer<ResolverContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  return expressMiddleware(server, {
    // deno-lint-ignore require-await
    context: async () => ({ db }),
  });
}
