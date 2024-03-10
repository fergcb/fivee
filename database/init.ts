import "std/dotenv/load.ts";
import ProgressBar from "https://deno.land/x/progress@v1.3.9/mod.ts";

import database from "$db/database.ts";
import { Context } from "$db/context.ts";
import { Document } from "$collections/_index.ts";
import chalk from "npm:chalk";

const DENO_KV_URL = Deno.env.get("DENO_KV_URL");

if (DENO_KV_URL && !Deno.env.get("DENO_KV_ACCESS_TOKEN")) {
  console.log(
    "You must specify a DENO_KV_ACCESS_TOKEN environment variable when using a remote Deno KV.",
  );
  Deno.exit(1);
}

// Connect to the database
console.log(`Establishing connection to Deno KV...`);
if (DENO_KV_URL !== undefined) {
  console.log(`DENO_KV_URL = ${DENO_KV_URL}`);
} else {
  console.log(`Using local Deno KV`);
}
const kv = await Deno.openKv(DENO_KV_URL);
console.log("Connected.");

// Compile the data
console.log("Compiling data...");
const ctx = new Context();
const data = database.resolveAll(ctx);
const records = [...data.entries()].filter(
  ([path, _]) => path.split(".").length === 2,
);
console.log(`Compiled ${records.length} records.\n`);

////////////////////////////
// Purge existing records //
////////////////////////////

// Get existing records
const existingRecords = [];
for await (const record of kv.list({ prefix: [] })) {
  existingRecords.push(record);
}

const purgeProgress = new ProgressBar({
  title: "Purging old documents:",
  total: existingRecords.length,
  complete: chalk.bgRed(" "),
  display: ":title :bar :completed/:total (:percent) :time/:eta :text",
});

// Delete existing records
let numDeleted = 0;
for (const record of existingRecords) {
  purgeProgress.render(numDeleted++, { text: record.key.join(".") });
  await kv.delete(record.key);
  purgeProgress.render(numDeleted, { text: record.key.join(".") });
}

purgeProgress.render(numDeleted, { text: "DONE" });

///////////////////////
// Write New Records //
///////////////////////

const progressBar = new ProgressBar({
  title: "Writing new documents:",
  total: records.length,
  display: ":title :bar :completed/:total (:percent) :time/:eta :text",
});

let numWritten = 0;
const errors = [];

// Write the records
for (const [path, value] of records) {
  const cacheKey = path.split(".");
  const collectionId = cacheKey[0];
  const key = [collectionId, (value as Document).id];
  progressBar.render(numWritten++, { text: key.join(".") });

  try {
    await kv.set(key, value);
  } catch (err) {
    errors.push(err);
  }

  progressBar.render(numWritten, { text: key.join(".") });
}

progressBar.render(numWritten, { text: "DONE" });

errors.forEach(console.error);

console.log(`\nCompleted initialisation with ${errors.length} errors.`);
