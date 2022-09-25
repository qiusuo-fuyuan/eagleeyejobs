import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express  from 'express';
import { expressjwt } from "express-jwt";

import http from 'http';
import { TypeDefs } from './schema.js'
import { resolvers } from './resolvers.js'
import mongoClientOps from './mongoOps.js'


async function startApolloServer(typeDefs: any, resolvers: any) {
  // Required logic for integrating with Express
  const app = express();

  //
  app.use(
    expressjwt({
      secret: "f1BtnWgD3VKY",
      algorithms: ["HS256"],
      credentialsRequired: false
    })
  );


  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);



  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/'
  });

  // Modified server startup
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


mongoClientOps.startConnectMongoServer()
mongoClientOps.startCreateModel()

mongoClientOps.jobModel.find((err: any, docs: any) => {
  if(!err){
    console.log("find jobs:", docs)
  } else {
    console.log(err)
  }
})


startApolloServer(TypeDefs, resolvers);