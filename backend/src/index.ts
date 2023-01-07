import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  gql,
} from 'apollo-server-core';

import { readFileSync }  from 'fs';
import { join } from 'path';

import express, { Request, Response }  from 'express';

import http from 'http';


/**
 * Here, js ending has to be used, and the problem is reported here.
 * Currently no idea why the index.ts has to specify the js as ending. It could be
 * that after ts-loader transpile the ts file into js file. The file actually has 
 * ending of js
 * https://github.com/microsoft/TypeScript/issues/42151
 */

import { MongoClient } from './core/db/MongoClient.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import cors from 'cors';
import logger from './utils/Logger.js';

dotenv.config({ path: `config/env.${process.env.NODE_ENV}` })

//init mongoDB
const mongoClient = new MongoClient()
mongoClient.init()

//read the schema graphql file synchronously
const typeDefs =  readFileSync(join(process.cwd(), "src/schema.graphql"), { encoding: "utf-8"})
const TypeDefs = gql`${typeDefs}`;

/* 
The import of the resolvers has to be placed after mongoClient.init(). This is very important. Because ther resolvers internally
import services, services internally import Repository. When repositories are being constructed, the database has to be connected, 
otherwise repositories construction will fail.
*/
let { resolvers } = await import('./resolvers.js');
//startApolloServer(TypeDefs, resolvers);


 // Required logic for integrating with Express
 const app = express();

 app.use(cors({ origin: 'http://localhost:4173' }));


 // Our httpServer handles incoming requests to our Express app.
 // Below, we tell Apollo Server to "drain" this httpServer,
 // enabling our servers to shut down gracefully.
 const httpServer = http.createServer(app);



 // Same ApolloServer initialization as before, plus the drain plugin
 // for our httpServer.

 let { getAuthenticatedUserFromToken } = await import('./middleware/JWTAuthenticationValidationMiddleware.js');

 const server = new ApolloServer({
   typeDefs,
   // mocks: true,
   resolvers,
   csrfPrevention: true,
   cache: 'bounded',
   introspection: true,
   plugins: [
     ApolloServerPluginDrainHttpServer({ httpServer }),
     ApolloServerPluginLandingPageLocalDefault({ embed: true }),
   ],
   context: async ({req, res}: {req: Request, res: Response}) => { 
      let user =  await getAuthenticatedUserFromToken(req, res)
      return { user }
    } 
 });

 // More required logic for integrating with Express
 await server.start();
 server.applyMiddleware({
   app,

   // By default, apollo-server hosts its GraphQL endpoint at the
   // server root. However, *other* Apollo Server packages host it at
   // /graphql. Optionally provide this to match apollo-server.
   path: '/graphql'
 });

 // Modified server startup
 await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
 logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
