import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { MongoClient } from "../../core/db/MongoClient.js";
import { migratePermissions } from './populatePermission.js';

dotenv.config({ path: `config/env.${process.env.NODE_ENV}` })

//start mongoDB
const mongoClient = new MongoClient()
mongoClient.init()




let { populateInitialUsers } = await import( './populateInitialUsers.js')
//initialize users
await populateInitialUsers("src/scripts/initializeServer/data/users.json")

await migratePermissions()
  .then(() => {
    console.log('Permissions migration completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error during permissions migration:', error);
    process.exit(1);
  });



mongoClient.disconnect()