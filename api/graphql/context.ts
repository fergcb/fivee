import { Database } from "$db/database.ts";

export interface ResolverContext {
  db: Database;
}
