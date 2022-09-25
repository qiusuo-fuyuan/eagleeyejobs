import mongoClientOps from "../../mongoOps.js"
import { Job } from '../../models/Job.js'


export class JobService {
    addJob(job: Job) {
        new mongoClientOps.jobModel(job).save((err:any ,docs:any) => {
            if(!err){
                console.log(docs)
            } else {
                console.log(err)
            }
        })
    }

    findJobs() : Array<Job> {
       return mongoClientOps.jobModel.find((err: any, docs: any) => {
            if(!err){
                console.log("find jobs:", docs)
                return docs
            } else {
                console.log(err)
            }
        })
    }
}