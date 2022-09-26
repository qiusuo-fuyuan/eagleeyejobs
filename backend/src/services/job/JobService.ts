import mongoClientOps from "../../mongoOps.js"
import { Job } from '../../models/Job.js'


export class JobService {
    addJob(job: Job) {
        // new mongoClientOps.jobModel(job).save((err:any ,docs:any) => {
        //     if(!err){
        //         console.log(docs)
        //     } else {
        //         console.log(err)
        //     }
        // })
    }

    async findJobs() : Promise<Array<Job>> {
        let data = await mongoClientOps.jobModel.find();
        return data
    }

    async queryJobDetail(jobId: String) {
        let data = await mongoClientOps.jobModel.findById(jobId)
        return data
    }
}