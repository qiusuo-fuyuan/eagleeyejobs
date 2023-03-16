# Backend Workflow

Please refer to the Backend diagram.drawoio. This diagram contains major designs of this application

(1) Define the graphql operations in schema.ts.
(2) Define corresponding resolvers in the resolvers folder. For example.
(3) Define the services for performing the actions in services folder.

(1) Using JWT for Apollo Server with Express. Basically the idea is the same as Spring Security Filter. Before hitting the /graphql endpoint.
do the checking of the jwt. This is can be achieved by jwt token.
https://www.apollographql.com/blog/backend/auth/setting-up-authentication-and-authorization-apollo-federation/


## Start All Docker Containers

There is a docker-compose folder. In this docker-compose, we setup the mongodb cluster, elasticsearch cluster, an which will synchronize the mongo database to elasticsearch. We currently do not have any configuration yet. But will add configuration later.


Before running the docker-compose up, add "127.0.0.1 mongo1" in the /etc/hosts both MAC and Linux file

docker-compose -f docker-compose-dev.yml up --force-recreate --remove-orphans --build

## initialize database

we need to populate some initial data for the database, such as admin, anonymous users. Run the command "npm run initialize:dev" before starting server

If you want to add more users, u can do it from the users.json file. U can also update the roles of some users after u performed wechat login process. In this way, u can test the permissions of different roles.


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

git clone git@github.com:qiusuo-fuyuan/thirdparty-mockserver.git
npm install && npm run start =>  will start wechat-mockserver. By default wechat-mockserver listens on 5000

open the link in browser
http://localhost:4000/wechat/requestLoginUrl   => the backend will return the qrcode url for wechat. This url is provided by our wechat-mockserver

http://localhost:5000/connect/qrconnect?appId=djl%C3%B6ajfdlkasjfoidwquroei%C3%B6dfsa&redirect_url=%2FauthorizeCallback%3Fprovider%3Dwechat&response_type=code&scope=snsapi_login&state=b1f50b74-18ce-4870-9066-170ff35c6fc9


directly open this url in browser. It will show the qrcode for login. This qrcode contains a link. But we can open the link directly from another tab to simulate user scans.

http://localhost:5000/connect/confirm?uuid=0215MUmK2z350w3w


After opening the link. the qrcode page will show as scanned.

Now click the confirmed button.  The qrcode page will redirect to authorizationCallback and return the jwtToken.


## Mongo DB

install MongoDB  extention https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode
set the mongo endpoint in mongo extention , input mongodb://localhost:27017

## ElasticSearch

For local development, the http-ssl is disabled

* xpack.security.http.ssl.enabled=false. For production, we should turn it on.

We should use volume for all docker container data


### Test ElasticSearch

To test elasticsearch, install the extention https://marketplace.visualstudio.com/items?itemName=ria.elastic.

Ctrl+Shift+P  => enter ES => input http://elastic:test1234@127.0.0.1:9200. There is a playground.es file inside src/scripts/elastic/playground.es. U can fire request to elasticsearch here.



kubectl apply -f https://raw.githubusercontent.com/cloudnativelabs/kube-router/master/daemonset/kubeadm-kuberouter.yaml

 kubectl apply -f https://raw.githubusercontent.com/kubernetes/website/master/content/en/exampl/es/application/nginx-app.yaml


 kubeadm join 192.168.0.6:6443 --token z39xo6.xg1j3pjh9f22uuq2     --discovery-token-ca-cert-hash sha256:bb1cfd921b9003b046019b237dca8af9cae2116b3b7f02a687571