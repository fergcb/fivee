import "std/dotenv/load.ts";

import server from "./api/server.ts";

await server.start();
