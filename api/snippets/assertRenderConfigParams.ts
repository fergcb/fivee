// @deno-types="npm:@types/express@4.17.21"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import { isValidTheme, THEME_NAMES } from "$snippets/themes.ts";
import { EXPRESSION_MODES, isValidExpressionMode } from "$exprs/parser.ts";

export default function assertCssMode(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const cssMode = req.query.cssMode ?? "bem";
  if (cssMode !== "tw" && cssMode !== "bem") {
    res.status(400);
    res.send(
      `The \`cssMode\` '${cssMode}' is not valid. Choose either 'bem' or 'tw'.`,
    );
    return;
  }

  const twTheme = req.query.twTheme;
  if (twTheme !== undefined && !isValidTheme(twTheme)) {
    const validThemes = THEME_NAMES.map((t) => `'${t}'`).join(", ");
    res.status(400);
    res.send(
      `The \`twTheme\` '${twTheme}' is not valid. Choose one of: ${validThemes}.`,
    );
  }

  const expressions = req.query.expressions;
  if (expressions !== undefined && !isValidExpressionMode(expressions)) {
    const validModes = EXPRESSION_MODES.map((m) => `'${m}'`).join(", ");
    res.status(400);
    res.send(
      `The \`expressions\` parameter value '${expressions}' is not valid. Choose one of: ${validModes}.`,
    );
  }

  return next();
}
