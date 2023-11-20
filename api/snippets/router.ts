// @deno-types="npm:@types/express@4.17.21"
import express, { Router } from "npm:express@4.18.2";
import { stylesRouter } from "$snippets/styles.controller.ts";
import assertRenderConfigParams from "$snippets/assertRenderConfigParams.ts";

import spellCard from "$snippets/spellCard/spellCard.controller.ts";

const snippets = express.Router();
snippets.use("/spell-card", spellCard);

const router = Router();
router.use(assertRenderConfigParams, snippets);
router.use("/styles", stylesRouter);
router.use("/assets", express.static("api/snippets/assets"));

export default router;
