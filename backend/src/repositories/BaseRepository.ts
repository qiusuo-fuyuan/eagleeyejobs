import { MongoClient } from "../core/db/MongoClient.js"

export class BaseRepository {
    public mongoClient: MongoClient   
    
    constructor() {
        this.mongoClient = MongoClient.instance    
    }

    getDocumentModel(schemaName: string) {
        this.mongoClient.getDocumentModel(schemaName)
    }
}