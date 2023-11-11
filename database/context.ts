import { Resolvable } from "$db/resolver.ts";

export function Path(...parts: string[]): string {
  return parts.join(".");
}

export class Context {
  constructor(
    private cache: Map<string, unknown> = new Map(),
    private stack: string[] = [],
    private queue: [string, Resolvable<unknown>, boolean][] = [],
  ) {}

  public get path(): string {
    return this.stack.at(-1) ?? "";
  }

  public enqueue(
    path: string,
    resolvable: Resolvable<unknown>,
    patch = false,
  ): void {
    this.queue.push([path, resolvable, patch]);
  }

  public dequeue(): [string, Resolvable<unknown>, boolean] {
    const next = this.queue.shift();
    if (next === undefined) throw Error("Reached end of queue unexpectedly.");
    return next;
  }

  public hasQueuedItems(): boolean {
    return this.queue.length > 0;
  }

  public isResolved(path: string = this.path): boolean {
    return this.cache.has(path);
  }

  public getResolved<T>(path: string = this.path): T {
    return this.cache.get(path) as T;
  }

  public markResolved<T>(value: T, path: string = this.path): void {
    this.cache.set(path, value);
  }

  public isPending(path: string = this.path): boolean {
    return this.stack.includes(path);
  }

  public pushPath(path: string): void {
    this.stack.push(path);
  }

  public popPath(): string {
    const path = this.stack.pop();
    if (path === undefined) {
      throw Error("Reached bottom of stack unexpectedly.");
    }
    return path;
  }

  public isPatchable(path: string = this.path): boolean {
    return this.cache.has(path) && typeof this.cache.get(path) === "object";
  }

  public getCache(): Map<string, unknown> {
    return this.cache;
  }
}
