import { MongoClient } from "../db/MongoClient.js"
import { BaseRepository } from "./BaseRepository.js"
import { Job, JobDocumentSchemaDefinition } from "../models/Job.js"

export class JobRepository extends BaseRepository{
    private jobDocumentModel: any

    constructor() {
        super()
        this.jobDocumentModel = this.mongoClient.getDocumentModel(JobDocumentSchemaDefinition.name)
    }

    findJobById(jobId: string): PromiseLike<Job> | Job {
        return this.jobDocumentModel.findById(jobId)
    }

    findJobByTitle(): PromiseLike<Job> | Job {
        return this.jobDocumentModel.findById()        
    }

    findAllJobs(): PromiseLike<Array<Job>> | Array<Job> {
        return this.jobDocumentModel.findById()
    }

    createJob(job: Job): Job | PromiseLike<Job> {
        let jobDocument = new this.jobDocumentModel()
        return jobDocument.save(job)
    }
}

