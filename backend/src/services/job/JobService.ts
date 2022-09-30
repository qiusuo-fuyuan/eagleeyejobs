import mongoClientOps from "../../mongoOps.js"
import { Job } from '../../models/Job.js'


export class JobService {
    async addJob(job: Job): Promise<Job> {
        return await new mongoClientOps.JobModel(job).save();
    }

    async findJobs() : Promise<Array<Job>> {
        let data = await mongoClientOps.JobModel.find();
        return data
    }

    async queryJobDetail(jobId: String) {
        return await mongoClientOps.JobModel.findById(jobId)
    }
}