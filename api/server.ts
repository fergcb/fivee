import { ApolloServer } from "npm:@apollo/server@^4.1";
import { startStandaloneServer } from "npm:@apollo/server@4.9/standalone";

import typeDefs from "$graphql/typeDefs.ts";
import * as resolvers from "$graphql/resolvers.ts";
import { Database } from "$db/database.ts";
import { ResolverContext } from "$graphql/context.ts";

async function start(db: Database) {
  const server = new ApolloServer<ResolverContext>({
    typeDefs,
    resolvers: {
      Query: {
        ...resolvers,
      },
    },
  });

  const { url } = await startStandaloneServer<ResolverContext>(server, {
    listen: { port: 8080 },
    // deno-lint-ignore require-await
    context: async () => ({ db }),
  });

  console.log(`Server running on: ${url}`);
}

export default { start };
