import { MongoClient } from "../core/db/MongoClient.js"

export class BaseRepository<T> {
    protected documentModel: any
    protected mongoClient: MongoClient   
    
    constructor(schemaName: string) {
        this.mongoClient = MongoClient.instance
        this.documentModel = this.getDocumentModel(schemaName) 
    }

    public findById(id: string): Promise<T> {
        return this.documentModel.findById(id)
    }

    public save(obj: T): Promise<T> {
        const newDocumentModel = new this.documentModel(obj)
        return newDocumentModel.save()
    }

    public find(keyValues: {[key: string]: any}): Promise<Array<T>> {
        return this.documentModel.find(keyValues)
    }

    public findOne(keyValues: {[key: string]: any}): Promise<T> {
        return this.documentModel.findOne(keyValues)
    }
    private getDocumentModel(schemaName: string): any {
        return this.mongoClient.getDocumentModel(schemaName)
    }
}




