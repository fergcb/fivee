import { SourceBook } from "./sourceBooks.ts";

export interface BaseDocument {
  id: string;
}

export interface Cost {
  currency: "cp" | "sp" | "ep" | "gp" | "pp";
  amount: number;
}

export interface Range {
  distance: number;
  unit: "feet" | "miles";
}

export interface Source {
  book: SourceBook;
  page: number;
}
