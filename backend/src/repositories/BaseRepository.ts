import { MongoClient } from "../core/db/MongoClient.js"

export class BaseRepository<Result> {
    protected documentModel: any
    protected mongoClient: MongoClient   
    
    constructor(schemaName: string) {
        this.mongoClient = MongoClient.instance
        this.documentModel = this.getDocumentModel(schemaName) 
    }

    public findById(id: string): Promise<Result> {
        return this.documentModel.findById(id)
    }

    public find(keyValues: {[key: string]: any}): Promise<Array<Result>> {
        return this.documentModel.find(keyValues).exec()
    }

    public findOne(keyValues: {[key: string]: any}): Promise<Result> {
        return this.documentModel.findOne(keyValues).exec()
    }
    private getDocumentModel(schemaName: string): any {
        return this.mongoClient.getDocumentModel(schemaName)
    }
}