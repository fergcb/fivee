import { collections } from "$collections/_index.ts";
import merge from "npm:lodash.merge";

export const resolvers = merge(
  {},
  ...Object.values(collections).map((col) => col.resolvers)
);

console.log(resolvers.Query);
