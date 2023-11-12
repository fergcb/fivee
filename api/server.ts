import { ApolloServer } from "npm:@apollo/server@^4.9";
import { startStandaloneServer } from "npm:@apollo/server@4.9/standalone";

import { Database } from "$db/database.ts";

import { typeDefs } from "$graphql/typeDefs.ts";
import { resolvers } from "$graphql/resolvers.ts";

export interface ResolverContext {
  db: Database;
}

async function start(db: Database) {
  const server = new ApolloServer<ResolverContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer<ResolverContext>(server, {
    listen: { port: 8080 },
    // deno-lint-ignore require-await
    context: async () => ({ db }),
  });

  console.log(`Server running on: ${url}`);
}

export default { start };
