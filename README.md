# Fivee

## Contributing

### Defining a new Collection

The minimal definition of a collection looks like this (using "mushrooms" as an
example):

```ts
import { ResolverContext } from "$graphql/context.ts";
import { collection } from "$collections/_collection.ts";
import { BaseDocument } from "$collections/_common.ts";

export const ID = "mushrooms";

/*
 * TypeScript Types
 */

export interface Mushroom extends BaseDocument {
  name: string;
}

/*
 * Resolver Parameter Types
 */

interface MushroomArgs {
  id: string;
}

/*
 * Collection Definition
 */

export default collection<Mushroom>({
  id: ID,
  typeDefs: `#graphql
    type Mushroom {
      id: String!
      name: String!
    }

    extend type Query {
      mushrooms: [Mushroom]
      mushroom(id: String!): Mushroom
    }
  `,
  resolvers: {
    async mushroom(
      _parent: unknown,
      { id }: MushroomArgs,
      { db }: ResolverContext,
    ): Promise<Mushroom> {
      return await db.get(ID, id);
    },
    async mushrooms(
      _parent: unknown,
      _args: never,
      { db }: ResolverContext,
    ): Promise<Mushroom[]> {
      return await db.list(ID);
    }
  }
  entries: [
    {
      id: "porcini",
      name: "Porcini",
    },
  ]
});
```

A new collection can be implemented by creating a file in the `collections/`
directory, and then registering the collection in `collections/_index.ts`.
