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




# Wechat mock server logs in

Our mockserver contains the functionality for mocking wechat for local development. How to test

run mock server
npm run start:mock

open the link in browser
http://localhost:4000/wechat/requestLoginUrl   => the backend will return the qrcode url for wechat. This url is provided by our mockserver

http://localhost:4000/connect/qrconnect?appId=djl%C3%B6ajfdlkasjfoidwquroei%C3%B6dfsa&redirect_url=%2FauthorizeCallback%3Fprovider%3Dwechat&response_type=code&scope=snsapi_login&state=b1f50b74-18ce-4870-9066-170ff35c6fc9


directly open this url in browser. It will show the qrcode for login. This qrcode contains a link. But we can open the link directly from another tab to simulate user scans.

http://localhost:4000/connect/confirm?uuid=0215MUmK2z350w3w


After opening the link. the qrcode page will show as scanned. 

Now click the confirmed button.  The qrcode page will redirect to authorizationCallback and return the jwtToken.