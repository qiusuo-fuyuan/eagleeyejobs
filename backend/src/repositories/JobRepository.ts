import { BaseRepository } from "./BaseRepository.js"
import { Job, JobDocumentSchemaDefinition } from "../models/Job.js"

export class JobRepository extends BaseRepository<Job>{
    constructor() {
        super(JobDocumentSchemaDefinition.name)
    }

    updateJob(job: Job): Promise<Job> {
        return this.documentModel.findByIdAndUpdate(job._id, job, {new: true})
    }

}


export default new JobRepository()
