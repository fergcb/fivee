import { Context, Path } from "$db/context.ts";
import {
  DEFER,
  defer,
  ENQUEUE,
  isResolver,
  isResolverFunc,
  Resolvable,
  VALUE,
  value,
} from "$db/resolver.ts";
import { Document } from "$collections/_index.ts";

import { CollectionID, collections } from "$collections/_index.ts";

export class Database {
  private kv: Deno.Kv | null = null;

  constructor() {}

  public async init() {
    this.kv = await Deno.openKv();
  }

  public async list<T extends Document>(
    collectionId: CollectionID
  ): Promise<T[]> {
    if (this.kv === null) {
      throw new Error("Database called before initialisation.");
    }
    const records = this.kv.list({ prefix: [collectionId] });
    const docs: T[] = [];
    for await (const record of records) docs.push(record.value as T);
    return docs;
  }

  public async get<T extends Document>(
    collectionId: CollectionID,
    docId: string
  ): Promise<T | null> {
    if (this.kv === null) {
      throw new Error("Database called before initialisation.");
    }
    const record = await this.kv.get([collectionId, docId]);
    return record.value as T;
  }

  public resolveAll(ctx: Context): Map<string, unknown> {
    // Add all the collections to the queue as arrays of resolvable objects
    Object.values(collections).forEach((col) => {
      ctx.enqueue(col.id, col.entries);
    });

    while (ctx.hasQueuedItems()) {
      const next = ctx.dequeue();
      const [path, value, patch] = next;

      // If the path already has a value, we can ignore it
      // unless we are performing a patch, where we want to add to
      // a cached value - this allows us to resolve circular references
      if (ctx.isResolved(path) && !patch) continue;

      // If the path is already in the stack, we are already in
      // the process of resolving its dependencies, so we defer it for now
      if (ctx.isPending(path)) {
        ctx.enqueue(path, value, patch);
        continue;
      }

      ctx.pushPath(path);
      this.resolve(value, ctx);
      ctx.popPath();
    }

    return ctx.getCache();
  }

  private resolve<T>(resolvable: Resolvable<T>, ctx: Context) {
    if (isResolver(resolvable)) {
      const res = isResolverFunc(resolvable)
        ? resolvable(ctx)
        : resolvable.resolve(ctx);
      switch (res.tag) {
        case DEFER:
          // Defer the current resolvable (e.g. if its dependencies weren't ready)
          ctx.enqueue(ctx.path, resolvable);
          return;
        case VALUE:
          if (ctx.isPatchable()) {
            Object.assign(ctx.getResolved<object>(), res.value);
            return;
          }

          ctx.markResolved(res.value);
          return;
        case ENQUEUE:
          // Add a new resolvable to the queue instead
          ctx.enqueue(ctx.path, res.resolvable);
          return;
      }
    } else if (Array.isArray(resolvable)) this.resolveArray(resolvable, ctx);
    else if (typeof resolvable === "object") {
      this.resolveObject(resolvable as object, ctx);
    } else {
      // console.log("GOT VALUE:", resolvable);
      ctx.markResolved(resolvable);
    }
  }

  private resolveArray<T>(arr: T[], ctx: Context): void {
    // console.log(`RESOLVING ARRAY with ${arr.length} items.`);
    arr.forEach((value, idx) => {
      const path = Path(ctx.path, idx.toString());
      ctx.enqueue(path, value);
    });
    ctx.enqueue(ctx.path, (ctx: Context) => {
      const resolved = [];
      for (let i = 0; i < arr.length; i++) {
        const path = Path(ctx.path, i.toString());
        if (!ctx.isResolved(path)) return defer();
        resolved.push(ctx.getResolved(path));
      }
      return value(resolved);
    });
  }

  private resolveObject<T extends object>(obj: T, ctx: Context): void {
    // console.log("RESOLVING OBJECT");
    const paths: string[] = [];
    Object.entries(obj).forEach(([field, value]) => {
      const path = Path(ctx.path, field);
      ctx.enqueue(path, value);
      paths.push(path);
    });
    ctx.enqueue(
      ctx.path,
      (ctx: Context) => {
        const resolved: Record<string, unknown> = {};
        let incomplete = false;
        for (const path of paths) {
          if (!ctx.isResolved(path)) {
            incomplete = true;
            continue;
          }
          const fieldName = path.split(".").at(-1)!;
          resolved[fieldName] = ctx.getResolved(path);
        }
        if (incomplete) ctx.enqueue(ctx.path, obj, true);
        return value(resolved);
      },
      true
    );
  }
}

const db = new Database();
await db.init();
export default db;
