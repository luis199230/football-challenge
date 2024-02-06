import "dotenv/config";

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { printSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import typeDefs from "../graphql/entities/typedefs";
import mergedResolvers from "../graphql/entities/resolvers";
import { setupOpenAPIServices } from '../util/openAPIService';
import servicesCreator from '../services';
import { boostrapDatabase } from './database';
import { FootballContext } from "./context";


(async () => {
    await boostrapDatabase();

    setupOpenAPIServices();

    const services = servicesCreator();

    const schema = makeExecutableSchema({ typeDefs });
    const printedSchema = printSchema(schema);
    const server = new ApolloServer<FootballContext>({ typeDefs: printedSchema, resolvers: mergedResolvers })
    const { url } = await startStandaloneServer<FootballContext>(server, {
        context: async () => {
            return ({ services });
        },
        listen: { port: +process.env.PORT ?? 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
})();
