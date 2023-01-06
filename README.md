# 


# Description

Currently both backend and frontend exist in the same repository eagleeyejobs.git.

We are using GraphQL on the backend to interface with the frontend instead of Rest interface. GraphQL makes it easier to develop frontend. (No worries, we have written some articles about the design of GraphQL)


# UI Prototype

The ui prototype currently is in figma. Please open this link to vue the ui protoype. Since we currently still have no UI designer, and the UI prototype also needs to be updated as well according to our development.


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

Git

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

Start all docker containers for the first time for local development.

Create docker network, and volume used for this project. With docker volume, even though we recreate the image, the original data still exists

```bash
docker-compose -f backend/dock/docker-compose-dev.yml up --force-recreate --remove-orphans --build
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


For elasticsearch, we have created a playground script inside backend/script/elasticsearch. U can verify whether elasticsearch is reachable from there



## Frontend Installation


cd frontend && npm install



# Production Deployment

We will deploy main server to two servers. One is “Zhubingqing”,






