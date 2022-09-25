import config from 'config'
import mongoose from 'mongoose'
import util  from 'util'

class MongoClientOps {
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
        var Schema = mongoose.Schema;

        var jobSchema = new Schema({
            title: {type:String, required: true},
            location: String
        }, { timestamps:true })

        this.jobModel = mongoose.model('job', jobSchema, 'job')

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

const mongoClientOps = new MongoClientOps()
export default mongoClientOps