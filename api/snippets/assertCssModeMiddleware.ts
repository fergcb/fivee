// @deno-types="npm:@types/express@4.17.21"
import { Request, Response, NextFunction } from "npm:express@4.18.2";

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

  return next();
}
