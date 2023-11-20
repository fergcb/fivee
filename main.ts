import "https://deno.land/std@0.207.0/dotenv/load.ts";

import server from "./api/server.ts";
import db from "$db/database.ts";

await db.init();

await server.start();
