import { MongoClient } from "../db/MongoClient.js"
import { BaseRepository } from "./BaseRepository.js"
import { Job, JobDocumentSchemaDefinition } from "../models/Job.js"

export class JobRepository extends BaseRepository{
    private JobDocumentModel: any

    constructor() {
        super()
        this.JobDocumentModel = this.mongoClient.getDocumentModel(JobDocumentSchemaDefinition.name)
    }

    findJobById(jobId: string): PromiseLike<Job> | Job {
        return this.JobDocumentModel.findById(jobId)
    }

    findJobByTitle(): PromiseLike<Job> | Job {
        return this.JobDocumentModel.findById()        
    }

    findAllJobs(): PromiseLike<Array<Job>> | Array<Job> {
        return this.JobDocumentModel.findById()
    }

    createJob(job: Job): Job | PromiseLike<Job> {
        let jobDocument = new this.JobDocumentModel()
        return jobDocument.save(job)
    }
}

