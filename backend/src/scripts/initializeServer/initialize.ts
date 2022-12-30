import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { MongoClient } from "../../core/db/MongoClient.js";




dotenv.config({ path: `config/env.${process.env.NODE_ENV}` })

//start mongoDB
const mongoClient = new MongoClient()
mongoClient.init()




let { populateInitialUsers } = await import( './populateInitialUsers.js')
//initialize users
await populateInitialUsers("src/scripts/server/data/users.json")

mongoClient.disconnect()