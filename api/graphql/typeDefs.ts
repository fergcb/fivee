import { typeDefs as abilityScoreDefs } from "$collections/abilityScores.ts";
import { typeDefs as damageTypeDefs } from "$collections/damageTypes.ts";
import { typeDefs as magicSchoolDefs } from "$collections/magicSchools.ts";
import { typeDefs as skillScoreDefs } from "$collections/skills.ts";
import { typeDefs as sourceBookDefs } from "$collections/sourceBooks.ts";
import { typeDefs as spellScoreDefs } from "$collections/spells.ts";

const collectionDefs = [
  abilityScoreDefs,
  damageTypeDefs,
  magicSchoolDefs,
  skillScoreDefs,
  sourceBookDefs,
  spellScoreDefs,
];

const common = `#graphql
  type Range {
    amount: Int!
    unit: String!
  }

  type Source {
    book: SourceBook!,
    page: Int!
  }
`;

const query = `type Query`;

const typeDefs = [common, query, ...collectionDefs];

export default typeDefs;
