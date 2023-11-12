// @deno-types="npm:@types/express@4.17.21"
import { Router, Request, Response } from "npm:express@4.18.2";
import * as sass from "npm:sass";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";

const ROUTES_DIR = path.dirname(path.fromFileUrl(import.meta.url));
const SASS_DIR = path.join(ROUTES_DIR, "/sass");

export const stylesRouter = Router();

stylesRouter.get("/:filename", (req: Request, res: Response) => {
  const cssFilename = req.params.filename;

  if (!cssFilename.endsWith(".css")) {
    res.status(400);
    res.send("Stylesheet name must end with '.css'.");
    return;
  }

  const scssFilename = cssFilename.replace(".css", ".scss");
  const stylesheetPath = path.join(SASS_DIR, scssFilename);

  try {
    Deno.statSync(stylesheetPath);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      res.status(404);
      res.send(`Couldn't find a stylesheet named '${cssFilename}'.`);
    } else {
      res.status(500);
      res.send("An internal server error occurred.");
    }
    return;
  }

  const result = sass.compile(stylesheetPath);

  res.status(200);
  res.setHeader("Content-Type", "text/css");
  res.send(result.css);
});
