import server from "./api/server.ts";
import db from "$db/database.ts";

await db.init();

await server.start();
