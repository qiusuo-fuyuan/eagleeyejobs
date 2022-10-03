import { MongoClient } from "../db/MongoClient.js"

export class BaseRepository {
    public mongoClient: MongoClient   
    
    constructor() {
        this.mongoClient = MongoClient.instance    
    }
}