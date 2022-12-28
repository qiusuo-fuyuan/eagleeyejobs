import { stringify } from "querystring"
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

    public find(keyValues: {[key: string]: any}): Promise<Array<T>> {
        return this.documentModel.find(keyValues)
    }

    public findOne(keyValues: {[key: string]: any}): Promise<T> {
        return this.documentModel.findOne(keyValues)
    }

    public findAll(): Promise<Array<T>> {
        return this.documentModel.find()
    }

    public save(obj: T): Promise<T> {
        let newDocument = new this.documentModel(obj)
        return newDocument.save()
    }

    // public updateById(id: string, keyValues: {[key: string]: any} ): Promise<T> {
    //     console.log("inside updateByID:" + id + "keyvalues" + ":" + keyValues)
    //     return this.documentModel.findByIdAndUpdate(id, keyValues)
    // }

    private getDocumentModel(schemaName: string): any {
        return this.mongoClient.getDocumentModel(schemaName)
    }
}




