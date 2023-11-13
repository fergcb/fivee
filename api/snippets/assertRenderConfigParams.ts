// @deno-types="npm:@types/express@4.17.21"
import { Request, Response, NextFunction } from "npm:express@4.18.2";
import { THEME_NAMES, isValidTheme } from "./class-names.ts";

export default function assertCssMode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cssMode = req.query.cssMode ?? "bem";
  if (cssMode !== "tw" && cssMode !== "bem") {
    res.status(400);
    res.send(
      `The cssMode '${cssMode}' is not valid. Choose either 'bem' or 'tw'.`
    );
    return;
  }

  const twTheme = req.query.twTheme;
  if (twTheme !== undefined && !isValidTheme(twTheme)) {
    const validThemes = THEME_NAMES.map((t) => `'${t}'`).join(", ");
    res.status(400);
    res.send(
      `The twTheme '${twTheme}' is not valid. Choose one of ${validThemes}.`
    );
  }

  return next();
}
