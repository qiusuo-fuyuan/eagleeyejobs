import { BaseRepository } from "./BaseRepository.js"
import { Job, JobDocumentSchemaDefinition } from "../models/Job.js"

export class JobRepository extends BaseRepository{
    public JobDocumentModel: any

    constructor() {
        super()
        this.JobDocumentModel = this.getDocumentModel(JobDocumentSchemaDefinition.name)
    }

    findJobById(jobId: string): PromiseLike<Job> | Job {
        return this.JobDocumentModel.findById(jobId)
    }

    createJob(job: Job): Job | PromiseLike<Job> {
        let jobDocument = new this.JobDocumentModel(job)
        return jobDocument.save()
    }

    updateJob(job: Job): Job | PromiseLike<Job> {
        return this.JobDocumentModel.findByIdAndUpdate(job._id, job, {new: true})
    }
}

