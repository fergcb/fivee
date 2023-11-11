import dedent from "npm:dedent-js";
import { Source } from "$collections/_common.ts";
import { CollectionID } from "$collections/_index.ts";
import { Document, SourceBook } from "$db/documents.ts";
import { Resolvable } from "$db/resolver.ts";
import { QueryBuilder, QueryFirst } from "$db/query.ts";

export function query<Doc extends Document>(
  collectionId: CollectionID
): QueryBuilder<Doc> {
  return new QueryBuilder<Doc>(collectionId);
}

export function ref<Doc extends Document>(
  collectionId: CollectionID,
  docId: string
): QueryFirst<Doc> {
  return new QueryFirst<Doc>(collectionId, [
    { field: "id", op: "==", value: docId },
  ]);
}

export function dice(diceString: string): string {
  // TODO: validate dice notation
  return diceString;
}

export function md(strings: TemplateStringsArray, ...args: unknown[]): string {
  return dedent(String.raw({ raw: strings }, args));
}

export function source(sourceBookId: string, page: number): Resolvable<Source> {
  return {
    book: ref<SourceBook>("sourceBooks", sourceBookId),
    page,
  };
}
