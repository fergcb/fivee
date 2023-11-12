import { collections } from "$collections/_index.ts";

const queryBase = "type Query";

const commonTypeDefs = `#graphql
  type Range {
    amount: Int!
    unit: String!
  }

  type Source {
    book: SourceBook!,
    page: Int!
  }
`;

const collectionTypeDefs = Object.values(collections).flatMap(
  (col) => col.typeDefs ?? []
);

export const typeDefs = [queryBase, commonTypeDefs, ...collectionTypeDefs];
