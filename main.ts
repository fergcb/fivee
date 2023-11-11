import server from "./api/server.ts";
import { Database } from "./database/database.ts";

const db = new Database();
await db.init();

await server.start(db);
