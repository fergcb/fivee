import dedent from "npm:dedent-js";
import { Cost, Currency, Damage, Source } from "$collections/_common.ts";
import { CollectionID, Document, SourceBook } from "$collections/_index.ts";
import { Resolvable } from "$db/resolver.ts";
import { QueryBuilder, QueryFirst } from "$db/query.ts";

export function query<Doc extends Document>(
  collectionId: CollectionID,
): QueryBuilder<Doc> {
  return new QueryBuilder<Doc>(collectionId);
}

export function ref<Doc extends Document>(
  collectionId: CollectionID,
  docId: Doc["id"],
): QueryFirst<Doc> {
  return new QueryFirst<Doc>(collectionId, [
    { field: "id", op: "==", value: docId },
  ]);
}

// deno-fmt-ignore
type Char =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m"
  | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
  | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

type Ident<T extends string> = T extends `${Char}${infer Rest}`
  ? T extends `${infer C}${Rest}` ? `${C}${Ident<Rest> | ""}`
  : never
  : never;

type DropOrKeep = "d" | "D" | "k" | "K";
type HighOrLow = "l" | "L" | "h" | "H";
type DiceModifier = `${DropOrKeep}${HighOrLow}${number | ""}` | "!" | "";
type DiceTerm<T extends string> =
  | `${number | ""}d${number}${DiceModifier}`
  | `${number}`
  | Ident<T>;
type DiceOperator = "+" | "-" | "*" | "/";
type DiceString<T extends string> = T extends DiceTerm<T> ? T
  : T extends `${infer F} ${DiceOperator} ${infer R}`
    ? T extends `${F} ${infer O} ${R}` ? `${DiceTerm<F>} ${O} ${DiceString<R>}`
    : never
  : never;

export function dice<T extends string>(
  diceString: T extends DiceString<T> ? T : DiceString<T>,
): T {
  return diceString;
}

type CostString = `${number} ${Currency}`;
export function cost(costString: CostString): Cost {
  const [amount, currency] = costString.split(" ");
  return {
    amount: parseFloat(amount),
    currency,
  } as Cost;
}

export function dmg<T extends string>(
  diceString: DiceString<T>,
  type: string,
): Resolvable<Damage> {
  return {
    dice: diceString,
    type: ref("damageTypes", type),
  };
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
