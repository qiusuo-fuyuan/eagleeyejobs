import { MongoClient } from "../db/MongoClient.js"
import { BaseRepository } from "./BaseRepository.js"
import { Job, JobPageOutput, JobDocumentSchemaDefinition } from "../models/Job.js"

export class JobRepository extends BaseRepository{
    public JobDocumentModel: any

    constructor() {
        super()
        this.JobDocumentModel = this.mongoClient.getDocumentModel(JobDocumentSchemaDefinition.name)
    }

    findJobById(jobId: string): PromiseLike<Job> | Job {
        return this.JobDocumentModel.findById(jobId)
    }

    /**
     * Fuzzy query by title and ignore case which is not deleted.
     * @param titleKeyword
     */
    async findJobsByTitle(titleKeyword: string, page: number, size: number): Promise<JobPageOutput> {
        if (page == undefined || page == null || page < 1) {
            page = 1
        }
        if (size == undefined || size <= 0) {
            size = 20
        }
        var count = await this.JobDocumentModel.count({
            title: {$regex: new RegExp(titleKeyword, 'i')},
            isDeleted: {$ne: 1}
        })
        var jobs = await this.JobDocumentModel.find({title: {$regex: new RegExp(titleKeyword, 'i')}, isDeleted: {$ne: 1}})
            .skip(size * (page - 1)).limit(size).sort({'updatedAt': -1, '_id': -1})
        var jobsOutput = new JobPageOutput()
        jobsOutput.size = size
        jobsOutput.current = page
        jobsOutput.total = count % size == 0 ? count / size : Math.floor(count / size) + 1
        jobsOutput.jobs = jobs
        return jobsOutput
    }

    findAllJobs(): PromiseLike<Array<Job>> | Array<Job> {
        return this.JobDocumentModel.find()
    }

    createJob(job: Job): Job | PromiseLike<Job> {
        let jobDocument = new this.JobDocumentModel(job)
        return jobDocument.save()
    }

    updateJob(job: Job): Job | PromiseLike<Job> {
        return this.JobDocumentModel.findByIdAndUpdate(job._id, job, {new: true})
    }
}

