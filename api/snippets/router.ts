// @deno-types="npm:@types/express@4.17.21"
import { Router } from "npm:express@4.18.2";
import { stylesRouter } from "./styles.ts";
import assertRenderConfigParams from "./assertRenderConfigParams.ts";

import spellCard from "./spellCard/spellCard.controller.ts";

const snippets = Router();
snippets.use("/spell-card", spellCard);

const router = Router();
router.use(assertRenderConfigParams, snippets);
router.use("/styles", stylesRouter);

export default router;
