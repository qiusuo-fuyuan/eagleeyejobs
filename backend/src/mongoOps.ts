import config from 'config'
import mongoose from 'mongoose'
import util  from 'util'

/**
 * Mongoose is based on Mongodb nodejs driver 
 * https://mongodb.github.io/node-mongodb-native/api-generated/collection.html
 * 
 * The major API used by user is 
 * db.createCollection() => creates collection(simiar to create database in mysql)
 * https://www.mongodb.com/docs/manual/reference/method/db.createCollection/ * collection.insertDocument() => insert a json object(insert record in mysql)
 * 
 * create collection offers validation options by providing a second argument. These validation
 * rules are created from our schema definition. This is why we provide a schema.
 * 
 * 
 * collection.insertDocument => insert document (similar to create table in mysql)
 * https://www.mongodb.com/docs/manual/tutorial/insert-documents/
 * 
 */
class MongoClient {
    jobModel: any

    startConnectMongoServer() {
        const host = config.get('mongo.host')
        const port = config.get('mongo.port')
        const db = config.get('mongo.db')
        const connectAddress = util.format("mongodb://%s:%s/%s", host, port, db)
        mongoose.connect(connectAddress)

        mongoose.connection.once('open',()=>{
            console.log('Mongodb connected %s successfully...', connectAddress)
        })
        mongoose.connection.once('error',()=>{
            console.log('Mongodb connected %s failed...', connectAddress)
        })
    }

    startCreateModel() {
        var jobSchema = new mongoose.Schema({
            title: {type:String, required: true},
            location: String
        }, { timestamps:true })

        this.jobModel = mongoose.model<mongoose.Schema>('job', jobSchema, 'job')

        // this.jobModel.create({
        //     title: "job-test1",
        //     location: "Shanghai"
        // },(err: any,docs: any)=>{
        //     if(!err){
        //         console.log('insert job ok:'+docs)
        //     }
        // })

    }
}

const mongoClient = new MongoClient()
export default mongoClient