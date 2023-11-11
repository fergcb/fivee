import { Entry } from "../database/resolver.ts";
import { Document } from "$db/documents.ts";

export class Collection<Doc extends Document> {
  constructor(
    public readonly id: string,
    public readonly entries: Entry<Doc>[],
  ) {}
}

export function collection<T extends Document>(
  collectionId: string,
  entries: Entry<T>[],
) {
  const ids = new Set<string>();

  for (const { id } of entries) {
    if (ids.has(id)) {
      throw new Error(`Duplicate id '${id}' in collection '${collectionId}'.`);
    }
    ids.add(id);
  }

  return new Collection<T>(collectionId, entries);
}
