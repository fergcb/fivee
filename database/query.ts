import { defer, IResolvable, ResolverResult, value } from "$db/resolver.ts";
import { Context } from "$db/context.ts";
import { CollectionID, Document } from "$collections/_index.ts";

export type Filter<Doc extends Document, Field extends keyof Doc> =
  | { field: Field; op: "==" | "!="; value: Doc[Field] }
  | { field: Field; op: "is"; value: Doc["id"] }
  | { field: Field; op: "isOneOf"; value: Doc["id"][] };

export class QueryBuilder<Doc extends Document> {
  constructor(
    private readonly collectionId: CollectionID,
    private readonly filters: Filter<Doc, keyof Doc>[] = [],
  ) {}

  public where<
    Field extends keyof Doc,
    Op extends F["op"],
    F extends Filter<Doc, Field>,
  >(
    field: Field,
    op: Op,
    value: F["value"],
  ): QueryBuilder<Doc> {
    const filter: Filter<Doc, Field> = { field, op, value } as F;
    return new QueryBuilder<Doc>(this.collectionId, [
      ...this.filters,
      filter,
    ]);
  }

  public first(): QueryFirst<Doc> {
    return new QueryFirst(this.collectionId, this.filters);
  }

  public all(): QueryAll<Doc> {
    return new QueryAll(this.collectionId, this.filters);
  }
}

export abstract class Query<Doc extends Document, Res>
  implements IResolvable<Res> {
  constructor(
    private readonly collectionId: CollectionID,
    private readonly filters: Filter<Doc, keyof Doc>[] = [],
  ) {}

  protected abstract _resolve(ctx: Context): Res;

  protected getCollection(ctx: Context): Doc[] {
    // console.log(`[QUERY] GETTING COLLECTION ${this.collectionId}`);
    // console.log(ctx.cache.get(this.collectionId));
    return ctx.getResolved<Doc[]>(this.collectionId).filter((doc) => {
      // console.log(`FILTERING DOCUMENT: `, doc);
      return this.filters.every((filter) => this.evaluateFilter(filter, doc));
    });
  }

  public resolve(ctx: Context): ResolverResult<Res> {
    if (ctx.isResolved(this.collectionId)) return value(this._resolve(ctx));
    return defer();
  }

  private evaluateFilter(
    filter: Filter<Doc, keyof Doc>,
    doc: Doc,
  ): boolean {
    const value = doc[filter.field] as unknown;
    if (value === undefined) {
      throw new Error(
        `Cannot filter on field '${
          String(
            filter.field,
          )
        }' as it does not exist on document '${doc.id}'`,
      );
    }
    switch (filter.op) {
      case "==":
        return value === filter.value;
      case "!=":
        return value !== filter.value;
      case "is":
        if (
          value === null ||
          !Object.hasOwn(value, "id") ||
          typeof (value as Document).id !== "string"
        ) {
          throw new Error(
            `Cannot filter with 'is' operator on '${doc.id}.${
              String(
                filter.field,
              )
            }' as its value is not a document.`,
          );
        }
        return (value as Document).id === filter.value;
      case "isOneOf":
        if (
          value === null ||
          !Object.hasOwn(value, "id") ||
          typeof (value as Document).id !== "string"
        ) {
          throw new Error(
            `Cannot filter with 'is' operator on '${doc.id}.${
              String(
                filter.field,
              )
            }' as its value is not a document.`,
          );
        }
        return filter.value.includes((value as Document).id);
    }
  }
}

export class QueryAll<Doc extends Document> extends Query<Doc, Doc[]> {
  protected _resolve(ctx: Context): Doc[] {
    return this.getCollection(ctx);
  }
}

export class QueryFirst<Doc extends Document> extends Query<Doc, Doc> {
  protected _resolve(ctx: Context): Doc {
    const docs = this.getCollection(ctx);
    if (docs.length < 1) {
      throw new Error(
        `No documents were found matching the query at ${ctx.path}.`,
      );
    }
    return docs[0];
  }
}
