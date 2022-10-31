import { MongoClient } from "../core/db/MongoClient.js"

export class BaseRepository<Result> {
    documentModel: any
    public mongoClient: MongoClient   
    
    constructor(schemaName: string) {
        this.mongoClient = MongoClient.instance
        this.documentModel = this.getDocumentModel(schemaName) 
    }

    findById(id: string): Promise<Result> {
        return this.documentModel.findById(id)
    }

    private getDocumentModel(schemaName: string): any {
        return this.mongoClient.getDocumentModel(schemaName)
    }
}