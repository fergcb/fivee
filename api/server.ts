import { express } from "$deps";
import { graphqlMiddleware } from "$graphql/middleware.ts";
import snippetsRouter from "$snippets/router.ts";
import cors from "npm:cors";
import boxen from "npm:boxen";
import chalk from "npm:chalk";
import morgan from "npm:morgan";

const PORT = Deno.env.get("PORT") ?? 8000;
const BASE_URL = Deno.env.get("BASE_URL") ?? `http://localhost:${PORT}`;

const links = boxen(
  Object.entries({
    Docs: "/docs",
    GraphQL: "/graphql",
    Snippets: "/snippets",
  })
    .map(([title, path]) => `${title}: ${chalk.yellow(BASE_URL + path)}`)
    .join("\n"),
  {
    title: "Fivee Server",
    padding: 1,
    borderColor: "blue",
    borderStyle: "double",
  }
);

const logger = morgan(
  (tokens: any, req: express.Request, res: express.Response) => {
    const status = tokens.status(req, res);

    return [
      chalk.yellow(new Date().toISOString()),
      chalk.blue(tokens.method(req, res)),
      tokens.url(req, res),
      status < 400 ? chalk.green(status) : chalk.red(status),
    ].join(" ");
  }
);

async function start() {
  const app = express();

  app.use(
    "/docs",
    logger,
    express.static(`${Deno.cwd()}/docs/build`, {
      etag: false,
      lastModified: false,
    })
  );

  app.use("/graphql", cors(), express.json(), await graphqlMiddleware());

  app.use("/snippets", logger, cors(), snippetsRouter);

  app.listen(PORT, () => {
    console.log("\n" + links);
  });
}

export default {
  start,
};
