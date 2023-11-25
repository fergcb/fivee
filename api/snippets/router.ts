import { express } from "$deps";
import { stylesRouter } from "$snippets/styles.controller.ts";
import assertRenderConfigParams from "$snippets/assertRenderConfigParams.ts";

import spellCard from "$snippets/spellCard/spellCard.controller.ts";

const snippets = express.Router();
snippets.use("/spell-card", spellCard);

const router = express.Router();
router.use(assertRenderConfigParams, snippets);
router.use("/styles", stylesRouter);
router.use(
  "/assets",
  express.static(`${Deno.cwd()}/api/snippets/assets`, {
    etag: false,
    lastModified: false,
  })
);

export default router;
