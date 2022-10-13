# Backend Workflow
Please refer to the Backend diagram.drawoio. This diagram contains major designs of this application

(1) Define the graphql operations in schema.ts.
(2) Define corresponding resolvers in the resolvers folder. For example.
(3) Define the services for performing the actions in services folder.

(1) Using JWT for Apollo Server with Express. Basically the idea is the same as Spring Security Filter. Before hitting the /graphql endpoint.
do the checking of the jwt. This is can be achieved by jwt token.
https://www.apollographql.com/blog/backend/auth/setting-up-authentication-and-authorization-apollo-federation/


## How to debug backend

U have to use vscode
just click the Launch Program

![Debug In VScode](./DebugBackendInVSCode.png)

![Set breakpoint](./SetDebugBreakPoint.png)


# Mock Server

The mockserver is started by command. The reason to create the mock server is to allow the frontend to work independently. The frontend
can directly modify the schema file. Mock data will be returned to frontend. So frontend will drive the implementation of schema.


npm run start:mock
