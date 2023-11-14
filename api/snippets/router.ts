// @deno-types="npm:@types/express@4.17.21"
import { Router } from "npm:express@4.18.2";
import { stylesRouter } from "$snippets/styles.controller.ts";
import assertRenderConfigParams from "$snippets/assertRenderConfigParams.ts";

import spellCard from "$snippets/spellCard/spellCard.controller.ts";

const snippets = Router();
snippets.use("/spell-card", spellCard);

const router = Router();
router.use(assertRenderConfigParams, snippets);
router.use("/styles", stylesRouter);

export default router;
