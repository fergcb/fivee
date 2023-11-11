import { Context } from "$db/context.ts";
import { Document } from "$db/documents.ts";

export const ENQUEUE = Symbol("ENQUEUE");
export const VALUE = Symbol("VALUE");
export const DEFER = Symbol("DEFER");

export type ResolverResult<T> =
  | {
    tag: typeof ENQUEUE;
    resolvable: Resolvable<T>;
  }
  | {
    tag: typeof VALUE;
    value: T;
  }
  | {
    tag: typeof DEFER;
  };

export function enqueue<T>(resolvable: Resolvable<T>): ResolverResult<T> {
  return { tag: ENQUEUE, resolvable };
}

export function value<T>(value: T): ResolverResult<T> {
  return { tag: VALUE, value };
}

export function defer<T>(): ResolverResult<T> {
  return { tag: DEFER };
}

export type Entry<T> = {
  [K in keyof T]: K extends "id" ? Document["id"] : Resolvable<T[K]>;
};

export type ResolverFunc<T> = (ctx: Context) => ResolverResult<T>;

export interface IResolvable<T> {
  resolve: ResolverFunc<T>;
}

export type Resolver<T> = ResolverFunc<T> | IResolvable<T>;

export type Resolvable<T> = T | Resolver<T> | Entry<T>;

export function implementsResolvable<T>(
  value: Resolvable<T>,
): value is IResolvable<T> {
  return (
    value !== null &&
    typeof value === "object" &&
    (value as IResolvable<T>).resolve instanceof Function
  );
}

export function isResolverFunc<T>(
  value: Resolvable<T>,
): value is ResolverFunc<T> {
  return value instanceof Function;
}

export function isResolver<T>(value: Resolvable<T>): value is Resolver<T> {
  return isResolverFunc(value) || implementsResolvable(value);
}
