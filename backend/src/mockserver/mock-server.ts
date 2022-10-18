import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import  {createServer } from '@graphql-yoga/node';
import {readFileSync}  from 'fs';
import { addMocksToSchema, mockServer } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers.js';
import { join } from 'path';


const typeDefs =  readFileSync(join(process.cwd(), "src/schema.graphql"), { encoding: "utf-8"})

const schema = makeExecutableSchema({typeDefs})

const preserveResolvers = false

const server = new ApolloServer({
    // addMocksToSchema accepts a schema instance and provides
    // mocked data for each field in the schema
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      preserveResolvers: true, 
    }),
  });

 
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

  console.log(`🚀 Server listening at: ${url}`);