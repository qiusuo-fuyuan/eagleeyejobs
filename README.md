# Description

Currently both backend and frontend exist in the same repository eagleeyejobs.git.

We are using GraphQL on the backend to interface with the frontend instead of Rest interface. GraphQL makes it easier to develop frontend. (No worries, we have written some articles about the design of GraphQL)


# UI Prototype

The ui prototype currently is in figma. Please open this link <https://www.figma.com/file/0ToIfqqWl5kw8pey8Rji0A/%E5%BC%80%E6%B6%A6?node-id=0%3A1&t=SxCiBh9pz4SlkolZ-1> to view the ui protoype. Since we currently still have no UI designer, and the UI prototype also needs to be updated as well according to our development.


# Business

The business documentation contains what we want to do with this website.


# Technical Stack

**Frontend** Vue,TS, GraphQL

**Backend** TS, Express, GraphQL, Mongo, ElasticSearch


# IDE-VSCode

In vscode, there are a few extentions u need to install to help write documentations, do some testing, view the data etc.


MongoDB: view mongodb data  <https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode>

ElasticSearch: view elasticsearch data <https://marketplace.visualstudio.com/items?itemName=ria.elastic>

Drawio: for diagraming <https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio>. There are some diagrams files ending with .drawio. These files can be opened directly in VSCode

GitLens: git tools to view the changes  <https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens>

<https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github>

Git: optional. can be used to view github issues in vscode <https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github>

Markdown Editor: used to easily update README.MD  <https://marketplace.visualstudio.com/items?itemName=patmood.rich-markdown-editor>


# NodeJS

We can use nvm to install node.

https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/

nvm ls => show all the node versions
nvm install v16.13.0 => install node 16.13.0
nvm use v16.13.0 => this command will use the node 16.13.0


# Architecture

Please open the diagrams.drawio.png file. This file contains a architecture tab.


# Installation Guide


git clone git@github.com:qiusuo-fuyuan/eagleeyejobs.git


# Backend installation

Add `"127.0.0.1 mongo1"` to `/etc/hosts`

`cd backend`

Start all docker containers for the first time for local development.


```bash
docker-compose -f docker-compose/docker-compose-dev.yml up --force-recreate --remove-orphans --build
```


The first time, it will needs to build some image. After first time, only mongodb, elasticsearch,monstache containers are needed. U can start them by

```bash
docker restart [containerId]
```


## Description of containers

the docker-compose-dev.yml contains mongodb, elasticsearch, monstache, mongo-init, es-setup




1. **mongo1**: stores our business objects like jobs, questions, users, etc
2. **es01**: In our website, users need to search for jobs, they also need to search for questions sometimes. We currently use ElasticSearch as the search engine
3. **monstache**: When recruiter adds a new job, this job needs to be synchronized from Mongodb to Elasticsearch. Monstache is service that can monitor the changes on MongoDB and sync to ElasticSearch
4. **mongo-init**: is used to initialize the mongo server as a replicaset. It will exist when it finishes initializing mongodb
5. **es-setup**: used to setup the certificates for elasticsearch. When we send request to elasticsearch it can use http or https. For local development, we disabled the TLS


Connect to mongodb from vscode

 ![setup mongodb vscode](./docs/pictures/mongosetup.drawio.png "left-50")




Connect to elasticsearch from vscode

```javascript
Ctrl+Shift+P => Type ES:Elastic, select ES SetHost => use http://elastic:test1234@127.0.0.1:9200.
```


For elasticsearch, we have created a playground script inside `/backend/src/scripts/elastic/playground.es`. U can verify whether elasticsearch is reachable from there. There are some test queries as well.


# Initialize database

we need to populate some initial data for the database, such as admin, anonymous users. Run the command "`npm run initialize:dev`"

If you want to add more users, u can do it from the users.json file. U can also update the roles of some users


# Backend Server

The backend uses dotenv to manage development and production environment. For local development, u can use

`npm run start:dev` to start backend server.


## Mock Server

GraphQL provides us with easy mocking for data, based on graphql, backend also provide a mockserver. You can start the mockserver by `npm run start:mock `Mockserver will start to return data from the resolver. It does not call any service.


# thirdparty-mockserver

To make local development for login easier, we have created thirdparty-mockserver. Currently it simulates the tencent open platform. It provides API to return  the login QR code, the access_token, refresh_token, wechat user info.

`git clone git@github.com:qiusuo-fuyuan/thirdparty-mockserver.git && npm install && npm run start` =>

By default thirdparty-mockserver listens on 5000


Open the link in browser http://localhost:4000/wechat/requestLoginUrl   => the backend will return the qrcode url for wechat. This url is provided by our wechat-mockserver

http://localhost:5000/connect/qrconnect?appId=djl%C3%B6ajfdlkasjfoidwquroei%C3%B6dfsa&redirect_url=%2FauthorizeCallback%3Fprovider%3Dwechat&response_type=code&scope=snsapi_login&state=b1f50b74-18ce-4870-9066-170ff35c6fc9


directly open this url in browser. It will show the qrcode for login. This qrcode contains a link. But we can open the link directly from another tab to simulate user scans.

http://localhost:5000/connect/confirm?uuid=0215MUmK2z350w3w


After opening the link. the qrcode page will show as scanned.

Now click the confirmed button.  The qrcode page will redirect to authorizationCallback and return the jwtToken.

## Frontend Installation

The frontend is using vite vue3.

`cd frontend && npm install && npm run codegen`


codegen will generate the GraphQL types which will be used for graphql queries.

Start frontend server `npm run dev`


# Production Deployment






