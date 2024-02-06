
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import typeDefs from "../graphql/entities/typedefs";

const schema = makeExecutableSchema({ typeDefs });
const printedSchema = printSchema(schema);


const config: CodegenConfig = {
  config: {
    contextType: '../server/context#FootballContext'
  },
  overwrite: true,
  schema: printedSchema,
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript", 
        "typescript-resolvers", 
        "typescript-document-nodes", 
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-unused-vars */'
          }
        }
      ]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
