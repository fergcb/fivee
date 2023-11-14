import { SourceBook } from "$collections/sourceBooks.ts";

export interface BaseDocument {
  id: string;
  name: string;
}

export interface Cost {
  currency: "cp" | "sp" | "ep" | "gp" | "pp";
  amount: number;
}

export interface Range {
  distance: number;
  unit: "foot" | "mile";
}

export interface Source {
  book: SourceBook;
  page: number;
}
