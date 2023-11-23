import { express } from "$deps";
import { isValidTheme, THEME_NAMES } from "$snippets/themes.ts";
import { EXPRESSION_MODES, isValidExpressionMode } from "$exprs/parser.ts";

export default function assertCssMode(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const cssMode = req.query.cssMode ?? "bem";
  if (cssMode !== "tw" && cssMode !== "bem") {
    res.status(400);
    res.send(
      `The \`cssMode\` '${cssMode}' is not valid. Choose either 'bem' or 'tw'.`,
    );
    return;
  }

  const theme = req.query.theme;
  if (theme !== undefined && !isValidTheme(theme)) {
    const validThemes = THEME_NAMES.map((t) => `'${t}'`).join(", ");
    res.status(400);
    res.send(
      `The \`theme\` '${theme}' is not valid. Choose one of: ${validThemes}.`,
    );
  }

  const expressions = req.query.expressions;
  if (
    expressions !== undefined && expressions !== "raw" &&
    !isValidExpressionMode(expressions)
  ) {
    const validModes = EXPRESSION_MODES.map((m) => `'${m}'`).join(", ");
    res.status(400);
    res.send(
      `The \`expressions\` parameter value '${expressions}' is not valid. Choose one of: ${validModes}.`,
    );
  }

  return next();
}
