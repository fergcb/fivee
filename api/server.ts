import express from "npm:express@4.18.2";
import cors from "npm:cors";
import { graphqlMiddleware } from "$graphql/middleware.ts";
import snippetsRouter from "$snippets/router.ts";
import boxen from "npm:boxen";
import dedent from "npm:dedent-js";
import chalk from "npm:chalk";
import morgan from "npm:morgan";

const PORT = Deno.env.get("PORT") ?? 8000;
const BASE_URL = Deno.env.get("BASE_URL") ?? `http://localhost:${PORT}`;

const logger = morgan((tokens: any, req: Request, res: Response) => {
  const status = tokens.status(req, res);

  return [
    chalk.yellow(new Date().toISOString()),
    chalk.blue(tokens.method(req, res)),
    tokens.url(req, res),
    status < 400 ? chalk.green(status) : chalk.red(status),
  ].join(" ");
});

async function start() {
  const app = express();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    await graphqlMiddleware(),
  );

  app.use("/snippets", logger, cors(), snippetsRouter);

  app.listen(PORT, () => {
    console.log(
      "\n" +
        boxen(
          dedent(`
          GraphQL: ${chalk.yellow(`${BASE_URL}/graphql`)}
          Snippets: ${chalk.yellow(`${BASE_URL}/snippets`)}
        `),
          {
            title: "Fivee Server",
            padding: 1,
            borderColor: "blue",
            borderStyle: "double",
          },
        ),
    );
  });
}

export default {
  start,
};
