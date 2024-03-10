import { SourceBook } from "$collections/sourceBooks.ts";
import { DamageType } from "$collections/damageTypes.ts";

export interface BaseDocument {
  id: string;
  name: string;
}

export type Currency = "cp" | "sp" | "ep" | "gp" | "pp";

export interface Cost {
  currency: Currency;
  amount: number;
}

export interface Damage {
  type: DamageType;
  dice: string;
}

export interface Range {
  distance: number;
  unit: "foot" | "mile";
}

export interface Source {
  book: SourceBook;
  page: number;
}
